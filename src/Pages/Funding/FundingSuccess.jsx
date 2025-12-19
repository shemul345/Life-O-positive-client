import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { MdVerified } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useSearchParams } from 'react-router';

const FundingSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const [txnId, setTxnId] = useState('');

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/funding-success?session_id=${sessionId}`)
                .then(res => {
                    if (res.data.success) {
                        setTxnId(res.data.transactionId);
                        Swal.fire("Thank You!", "Funding Received Successfully", "success");
                    }
                });
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-5">
            <MdVerified className="text-green-500 text-7xl mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Thank you for your voluntary contribution.</p>

            <div className="bg-gray-100 p-6 rounded-lg w-full max-w-lg text-center shadow-inner">
                <p className="text-sm text-gray-500 uppercase font-bold mb-1">Your Transaction ID</p>
                <p className="text-xl font-mono font-bold text-red-600 break-all">{txnId || 'Loading...'}</p>
            </div>

            <Link to="/" className="mt-8 btn btn-primary px-10">Back to Home</Link>
        </div>
    );
};

export default FundingSuccess;