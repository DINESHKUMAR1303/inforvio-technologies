import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const Header = ({ onAddClick }) => {
    return (
        <div className="py-3 border-bottom bg-white">
            <div className="container d-flex justify-content-between align-items-center">
                <h2 className="fw-bold m-0" style={{ color: '#374151' }}>Document Upload</h2>
                <Button
                    variant="primary"
                    onClick={onAddClick}
                    style={{ backgroundColor: 'var(--primary-blue)', borderColor: 'var(--primary-blue)' }}
                >
                    <FaPlus className="me-2" />
                    Add Applicant
                </Button>
            </div>
        </div>
    );
};

export default Header;
