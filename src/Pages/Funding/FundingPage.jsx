import React, { useState } from 'react';
import { FaHeart, FaUser, FaEnvelope } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const FundingPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');

    const handleFunding = async (e) => {
        e.preventDefault();

        const donorName = user?.displayName || guestName;
        const donorEmail = user?.email || guestEmail;

        if (!donorName || !donorEmail) {
            return Swal.fire("Error", "Please provide your name and email", "error");
        }

        setLoading(true);

        const fundingInfo = {
            amount: parseFloat(amount),
            donorName: donorName,
            donorEmail: donorEmail,
        };

        try {
            const res = await axiosSecure.post('/create-funding-checkout', fundingInfo);
            if (res.data.url) {
                window.location.assign(res.data.url);
            }
        } catch {
            setLoading(false);
            // console.error("Connection Error Details:", error);
            Swal.fire("Error", "Could not connect to server. Check if your backend is running!", "error");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 p-5 rounded-2xl">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center border border-gray-100">
                <FaHeart className="text-red-500 text-5xl mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold mb-2 text-gray-800">Support LifeO+</h2>
                <p className="text-gray-500 mb-6 text-sm">Your contribution helps us save lives.</p>

                <form onSubmit={handleFunding} className="space-y-4">
                    {!user && (
                        <div className="space-y-3">
                            <div className="relative">
                                <FaUser className="absolute left-3 top-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full pl-10 p-3 border rounded-xl outline-none focus:border-red-500"
                                    onChange={(e) => setGuestName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-10 p-3 border rounded-xl outline-none focus:border-red-500"
                                    onChange={(e) => setGuestEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Amount */}
                    <input
                        type="number"
                        placeholder="Enter Amount (USD)"
                        className="w-full p-4 border-2 border-red-50 border-dashed rounded-xl mb-4 focus:border-red-500 outline-none text-xl font-bold text-center text-red-600"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-bold py-4 rounded-xl transition-all duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Redirecting...
                            </span>
                        ) : 'Donate Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FundingPage;