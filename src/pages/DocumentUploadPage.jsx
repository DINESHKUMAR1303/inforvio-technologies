import React, { useState } from 'react';
import Header from '../components/Header';
import ApplicantTabs from '../components/ApplicantTabs';
import Sidebar from '../components/Sidebar';
import DocumentUploader from '../components/DocumentUploader';
import AddApplicantModal from '../components/AddApplicantModal';
import AddDocumentModal from '../components/AddDocumentModal';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';

const DocumentUploadPage = () => {
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicantId, setSelectedApplicantId] = useState(null);
    const [showApplicantModal, setShowApplicantModal] = useState(false);

    // New: Modal state for adding documents
    const [showDocModal, setShowDocModal] = useState(false);

    // Structure: { applicantId: { docType: fileName } }
    const [documents, setDocuments] = useState({});

    // Structure: { applicantId: ['Pan Card', 'Aadhar'] } - Dynamic Content
    const [applicantDocTypes, setApplicantDocTypes] = useState({});

    const [activeDocType, setActiveDocType] = useState('');

    const handleAddApplicant = (name) => {
        const newId = applicants.length ? Math.max(...applicants.map(a => a.id)) + 1 : 1;
        const newApplicant = { id: newId, name };
        setApplicants([...applicants, newApplicant]);
        setSelectedApplicantId(newId);

        // Initialize with empty document list
        setApplicantDocTypes(prev => ({ ...prev, [newId]: [] }));

        setShowApplicantModal(false);
    };

    const handleDeleteApplicant = (id) => {
        const updated = applicants.filter(a => a.id !== id);
        setApplicants(updated);

        const newDocTypes = { ...applicantDocTypes };
        delete newDocTypes[id];
        setApplicantDocTypes(newDocTypes);

        if (selectedApplicantId === id) {
            if (updated.length > 0) {
                setSelectedApplicantId(updated[0].id);
            } else {
                setSelectedApplicantId(null);
            }
        }
    };

    const handleAddDocumentClick = () => {
        setShowDocModal(true);
    };

    const handleSaveDocument = (docName) => {
        if (!selectedApplicantId) return;

        setApplicantDocTypes(prev => {
            const currentList = prev[selectedApplicantId] || [];
            if (currentList.includes(docName)) return prev; // Prevent duplicates
            return {
                ...prev,
                [selectedApplicantId]: [...currentList, docName]
            };
        });

        // Automatically select the new document
        setActiveDocType(docName);
        setShowDocModal(false);
    };

    const handleUpload = (file) => {
        if (!selectedApplicantId || !activeDocType) return;
        setDocuments(prev => ({
            ...prev,
            [selectedApplicantId]: {
                ...prev[selectedApplicantId],
                [activeDocType]: file.name
            }
        }));
    };

    const handleRemoveDoc = (docType) => {
        if (!selectedApplicantId) return;
        setDocuments(prev => {
            const updatedDocs = { ...prev[selectedApplicantId] };
            delete updatedDocs[docType];
            return { ...prev, [selectedApplicantId]: updatedDocs };
        });
    }

    // Hepler to get current applicant's doc types
    const currentDocTypes = selectedApplicantId ? (applicantDocTypes[selectedApplicantId] || []) : [];

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <Header onAddClick={() => setShowApplicantModal(true)} />

            <Container className="flex-grow-1 mt-4">
                {applicants.length > 0 && (
                    <>
                        <ApplicantTabs
                            applicants={applicants}
                            selectedId={selectedApplicantId}
                            onSelect={setSelectedApplicantId}
                            onDelete={handleDeleteApplicant}
                        />
                        <hr className="my-0 mb-4" style={{ borderColor: '#e5e7eb' }} />
                    </>
                )}

                {applicants.length > 0 && selectedApplicantId ? (
                    currentDocTypes.length === 0 ? (
                        <div className="py-2">
                            <p className="text-muted mb-3">No documents available</p>
                            <Button
                                variant="primary"
                                onClick={handleAddDocumentClick}
                                className="px-5 py-2 fw-bold d-flex align-items-center justify-content-center"
                                style={{ backgroundColor: 'var(--primary-blue)', borderColor: 'var(--primary-blue)', width: 'fit-content' }}
                            >
                                <FaPlus className="me-2" size={14} /> Add
                            </Button>
                        </div>
                    ) : (
                        <Row>
                            <Col md={3} className="border-end">
                                <Sidebar
                                    documentTypes={currentDocTypes}
                                    activeType={activeDocType}
                                    onSelectType={setActiveDocType}
                                    onAddDocument={handleAddDocumentClick}
                                    uploadedDocs={documents[selectedApplicantId] || {}}
                                />
                            </Col>
                            <Col md={9}>
                                {activeDocType && (
                                    <DocumentUploader
                                        activeType={activeDocType}
                                        onUpload={handleUpload}
                                        currentFile={documents[selectedApplicantId]?.[activeDocType]}
                                        onRemove={() => handleRemoveDoc(activeDocType)}
                                    />
                                )}
                            </Col>
                        </Row>
                    )
                ) : (
                    <div className="text-center mt-5 text-muted">
                        Please add an applicant to get started.
                    </div>
                )}
            </Container>

            <footer className="p-3 mt-auto border-top bg-white">
                <Container className="d-flex justify-content-between">
                    <Button variant="primary" className="px-4" style={{ backgroundColor: 'var(--primary-blue)', borderColor: 'var(--primary-blue)' }}><FaArrowLeft className="me-2" /> Back</Button>
                    <Button variant="primary" className="px-4" style={{ backgroundColor: 'var(--primary-blue)', borderColor: 'var(--primary-blue)' }}>Next <FaArrowRight className="ms-2" /></Button>
                </Container>
            </footer>

            <AddApplicantModal
                show={showApplicantModal}
                onHide={() => setShowApplicantModal(false)}
                onSave={handleAddApplicant}
            />

            <AddDocumentModal
                show={showDocModal}
                onHide={() => setShowDocModal(false)}
                onSave={handleSaveDocument}
            />
        </div>
    );
};

export default DocumentUploadPage;
