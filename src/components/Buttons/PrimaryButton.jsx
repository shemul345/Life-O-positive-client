import React from 'react';

const PrimaryButton = ({ children, onClick, ariaLabel }) => {
    return (
        <div>
            <button
                onClick={onClick}
                aria-label={ariaLabel}
                className={
                    `inline-flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-white shadow-lg transition-transform ` +
                    `transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300` +
                    ` bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800`
                }
            >
                {children}
            </button>
        </div>
    );
};

export default PrimaryButton;