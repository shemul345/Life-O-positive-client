import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const FundingCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-5">
            <div className="text-center">
                <FaTimesCircle className="text-red-500 text-7xl mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Payment Cancelled</h2>
                <p className="text-gray-500 mb-6">Don't worry, no money was deducted. You can try again anytime.</p>
                <Link to="/funding" className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold">
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default FundingCancelled;