import React from 'react';

// CustomCheckbox Component
const CustomCheckbox = ({ checked, onChange }) => {
    return (
        <div
            className="custom-checkbox"
            onClick={onChange}
            style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                border: checked ? '2px solid #4CAF50' : '2px solid #ccc',
                backgroundColor: checked ? '#4CAF50' : 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            }}
        >
            {checked ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    viewBox="0 0 16 16"
                >
                    <path d="M13.854 4.646a.5.5 0 0 0-.708-.708L6 11.293 3.354 8.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
            )
                : null
            }
        </div>
    );
};

export default CustomCheckbox;
