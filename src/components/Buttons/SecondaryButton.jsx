import React from 'react';

const SecondaryButton = ({ children, onClick, ariaLabel }) => {
    return (
        <div>
            <button
                onClick={onClick}
                aria-label={ariaLabel}
                className={
                    `inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors border-2 ` +
                    `border-black hover:border-blue-900 bg-white text-black hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-200`
                }
            >
                {children}
            </button>
        </div>
    );
};

export default SecondaryButton;