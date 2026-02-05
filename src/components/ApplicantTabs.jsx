import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const ApplicantTabs = ({ applicants, selectedId, onSelect, onDelete }) => {
    return (
        <div className="d-flex align-items-center mb-0 gap-4 overflow-auto pb-2">
            {applicants.map(applicant => {
                const isSelected = selectedId === applicant.id;
                return (
                    <div
                        key={applicant.id}
                        className={`d-flex align-items-center gap-3 cursor-pointer`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onSelect(applicant.id)}
                    >
                        <span style={{
                            color: isSelected ? 'var(--primary-blue)' : '#6b7280',
                            fontSize: '1rem',
                            fontWeight: isSelected ? 600 : 400
                        }}>
                            {applicant.name}
                        </span>

                        <Button
                            style={{
                                backgroundColor: 'var(--primary-blue)',
                                borderColor: 'transparent',
                                borderRadius: '6px',
                                width: '32px',
                                height: '32px',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onClick={(e) => { e.stopPropagation(); onDelete(applicant.id); }}
                        >
                            <FaTrash color="white" size={14} />
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};

export default ApplicantTabs;
