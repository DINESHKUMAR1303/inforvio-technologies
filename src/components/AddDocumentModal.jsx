import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AddDocumentModal = ({ show, onHide, onSave }) => {
    const [docName, setDocName] = useState('');

    const handleSubmit = () => {
        if (docName.trim()) {
            onSave(docName);
            setDocName('');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold" style={{ color: '#1f2937' }}>Add</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-4">
                <Form.Group>
                    <Form.Label className="text-muted mb-2">Document Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        className="py-2"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0 pb-4">
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    className="px-4"
                    style={{ backgroundColor: 'var(--primary-blue)', borderColor: 'var(--primary-blue)' }}
                >
                    <FaCheck className="me-2" /> Save
                </Button>
                <Button
                    variant="secondary"
                    onClick={onHide}
                    className="px-4"
                    style={{ backgroundColor: '#6b7280', borderColor: '#6b7280' }}
                >
                    <FaTimes className="me-2" /> Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddDocumentModal;
