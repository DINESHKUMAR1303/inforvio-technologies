import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaUpload, FaTimes, FaFileAlt } from 'react-icons/fa';

const DocumentUploader = ({ activeType, onUpload, currentFile, onRemove }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Reset internal selection when active type changes or currentFile updates
    useEffect(() => {
        if (!currentFile) {
            setSelectedFile(null);
        }
    }, [activeType, currentFile]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleChooseClick = () => {
        fileInputRef.current.click();
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            onUpload(selectedFile);
            // We keep selectedFile to show the "Completed" state momentarily if needed, 
            // but usually the parent passes back 'currentFile' which takes precedence.
        }
    };

    const handleCancelClick = () => {
        setSelectedFile(null);
    };

    // Determine what to display
    // logic: 
    // - currentFile exists = "Completed" state
    // - selectedFile exists (and not currentFile) = "Pending" state
    // - neither = Empty state

    const fileToShow = currentFile ? { name: currentFile, size: '38.44 KB', status: 'Completed' } :
        selectedFile ? { name: selectedFile.name, size: (selectedFile.size / 1024).toFixed(2) + ' KB', status: 'Pending' } : null;

    return (
        <div className="border rounded-3 p-0 bg-white" style={{ borderColor: '#e5e7eb', overflow: 'hidden' }}>
            {/* Top Action Bar Container */}
            <div className="p-3 border-bottom" style={{ borderColor: '#f3f4f6', backgroundColor: '#fff' }}>
                <div className="d-flex flex-wrap gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <Button
                        variant="primary"
                        onClick={handleChooseClick}
                        className="px-3 px-sm-4 fw-bold border-0"
                        style={{ backgroundColor: '#3b82f6' }}
                    >
                        <FaPlus className="me-2" size={12} /> Choose
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleUploadClick}
                        className="px-3 px-sm-4 fw-bold border-0"
                        disabled={!selectedFile || !!currentFile}
                        style={{ backgroundColor: '#3b82f6', color: 'white' }}
                    >
                        <FaUpload className="me-2" size={12} /> Upload
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleCancelClick}
                        className="px-3 px-sm-4 fw-bold border-0"
                        disabled={!selectedFile && !currentFile}
                        style={{ backgroundColor: '#3b82f6', color: 'white' }}
                    >
                        <FaTimes className="me-2" size={12} /> Cancel
                    </Button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4" style={{ minHeight: '200px' }}>
                {fileToShow ? (
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                            {/* Thumbnail */}
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    backgroundColor: '#1f2937',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px'
                                }}
                            >
                                <span style={{ color: '#9ca3af', fontSize: '8px', transform: 'rotate(-90deg)', fontWeight: 'bold' }}>FILE</span>
                            </div>

                            <div>
                                <p className="mb-0 fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{fileToShow.name}</p>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>{fileToShow.size}</span>
                                    <span
                                        className="badge rounded-pill"
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '0.7rem',
                                            padding: '5px 10px',
                                            backgroundColor: fileToShow.status === 'Completed' ? '#22c55e' : '#f59e0b',
                                            color: 'white'
                                        }}
                                    >
                                        {fileToShow.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="link"
                            onClick={currentFile ? onRemove : handleCancelClick}
                            className="text-danger p-0 border-0"
                        >
                            <FaTimes size={14} />
                        </Button>
                    </div>
                ) : (
                    <div
                        className="d-flex flex-column align-items-start justify-content-center h-100"
                    >
                        <p style={{ color: '#3b82f6', margin: 0 }}>Drag and Drop files here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentUploader;
