import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const Sidebar = ({ documentTypes, activeType, onSelectType, onAddDocument, uploadedDocs }) => {
    return (
        <div className="d-flex flex-column gap-3 py-3">
            {documentTypes.map((type, index) => {
                const isActive = activeType === type;
                const isUploaded = uploadedDocs[type];

                return (
                    <div
                        key={index}
                        onClick={() => onSelectType(type)}
                        className={`p-3 rounded-3 d-flex justify-content-center align-items-center text-center`}
                        style={{
                            backgroundColor: isActive ? 'var(--primary-blue)' : '#fff',
                            color: isActive ? 'white' : 'var(--primary-blue)',
                            border: isActive ? 'none' : '1px solid var(--primary-blue)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: 500,
                            textTransform: 'capitalize',
                            height: '80px', /* Square-ish look from image */
                            width: '100px', /* Fixed width to look like tiles? Actually image shows list but stylized. Let's keep it responsive but distinct */
                            minWidth: '100%', /* Reset to full width for list layout */
                        }}
                    >
                        <span>{type}</span>
                        {/* Status Checkmark if needed, though image doesn't explicitly show it on the tile, keeping logic hidden for now to match strict "exact image" */}
                        {isUploaded && !isActive && (
                            <span className="badge bg-success rounded-pill ms-2" style={{ fontSize: '0.6rem' }}>✓</span>
                        )}
                    </div>
                );
            })}

            <Button
                variant="outline-primary"
                className="w-100 py-2 fw-bold btn-custom-outline"
                style={{
                    // specific style removed in favor of CSS class for hover handling
                }}
                onClick={onAddDocument}
            >
                <FaPlus className="me-2" /> Add
            </Button>
        </div>
    );
};

export default Sidebar;
