import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loader from '../../../components/Loader/Loader';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(0);
    const size = 15;

    const { data, isLoading } = useQuery({
        queryKey: ['publicPendingRequests', currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-blood-donation-requests?status=pending&page=${currentPage}&size=${size}`);
            return res.data;
        }
    });

    const requests = data?.result || [];
    const totalCount = data?.count || 0;
    const numberOfPages = Math.ceil(totalCount / size);
    const pages = [...Array(numberOfPages).keys()];

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto my-16 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase mb-2">Available <span className="text-red-600">Donation</span> Requests</h1>
                <p className="text-gray-500 font-medium">Find urgent blood requirements and save lives today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {requests.map(request => (
                    <div key={request._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 font-black text-2xl border border-red-100">
                                {request.bloodGroup}
                            </div>
                            <span className="badge badge-warning font-bold p-3 uppercase text-[10px] tracking-widest">
                                {request.donationStatus || request.status}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">{request.recipientName}</h3>

                        <div className="space-y-3 text-sm text-gray-500 font-medium">
                            <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-400" /> {request.hospitalName}, {request.recipientDistrict}</p>
                            <p className="flex items-center gap-2"><FaCalendarAlt className="text-red-400" /> {request.donationDate} at {request.donationTime}</p>
                        </div>

                        <div className="mt-6">
                            <Link
                                to={`/donation-requests/${request._id}`}
                                className="btn btn-neutral w-full rounded-xl font-bold border-none bg-gray-900 hover:bg-red-600 text-white"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {numberOfPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        className="btn btn-sm"
                        disabled={currentPage === 0}
                    >Prev</button>

                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? 'btn-error text-white' : ''}`}
                        >
                            {page + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(numberOfPages - 1, prev + 1))}
                        className="btn btn-sm"
                        disabled={currentPage === numberOfPages - 1}
                    >Next</button>
                </div>
            )}

            {requests.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed">
                    <p className="text-gray-400 font-bold text-xl uppercase tracking-widest">No Active Requests Found</p>
                </div>
            )}
        </div>
    );
};

export default DonationRequests;