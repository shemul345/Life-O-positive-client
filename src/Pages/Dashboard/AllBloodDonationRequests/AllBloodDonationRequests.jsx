import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt, FaEye, FaCheckCircle, FaTimesCircle, FaHandHoldingHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const AllBloodDonationRequests = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const size = 15;

    // ডাটা ফেচিং - এরর ফিক্স করা হয়েছে (data.result ব্যবহার করে)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allBloodDonationRequests', filter, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-requests?status=${filter}&page=${currentPage}&size=${size}`);
            return res.data;
        }
    });

    // এরর হ্যান্ডেলিং এর জন্য ডাটা সেপারেশন
    const requests = data?.result || [];
    const totalCount = data?.count || 0;
    const numberOfPages = Math.ceil(totalCount / size);
    const pages = [...Array(numberOfPages).keys()];

    // স্ট্যাটাস পরিবর্তনের হ্যান্ডেলার
    const handleStatusChange = async (id, newStatus) => {
        let title = `Mark as ${newStatus}?`;
        let text = "Do you want to update this request status?";

        if (newStatus === 'inprogress') {
            title = "Accept this Request?";
            text = "By accepting, you are committing to help this patient.";
        }

        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed'
        });

        if (result.isConfirmed) {
            try {
                const updateData = {
                    status: newStatus,
                    donorName: user?.displayName,
                    donorEmail: user?.email
                };

                const res = await axiosSecure.patch(`/donation-requests/status/${id}`, updateData);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire('Updated!', `Request is now ${newStatus}.`, 'success');
                }
            } catch {
                Swal.fire('Error', 'Failed to update status', 'error');
            }
        }
    };

    // ডিলিট করার হ্যান্ডেলার
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This request will be permanently removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        });

        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/donation-requests/${id}`);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire('Deleted!', 'Request has been removed.', 'success');
            }
        }
    };

    const statusClasses = {
        pending: 'badge-warning text-white',
        inprogress: 'badge-info text-white',
        done: 'badge-success text-white',
        canceled: 'badge-error text-white',
    };

    if (loading || isLoading) return <Loader />;

    return (
        <div className="p-6 bg-base-100 rounded-3xl shadow-sm border border-base-200">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-neutral tracking-tight">
                        Blood Donation <span className="text-red-600">Requests</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Accept and manage donation lifecycles</p>
                </div>

                <select
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(0); // ফিল্টার চেঞ্জ করলে প্রথম পেজে নিয়ে যাবে
                    }}
                    value={filter}
                    className="select select-bordered w-full md:w-48 font-bold text-gray-600 rounded-xl"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-base-200">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-50 text-neutral text-sm uppercase">
                        <tr>
                            <th>#</th>
                            <th>Recipient Info</th>
                            <th>Location</th>
                            <th>Date/Time</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((request, index) => (
                                <tr key={request._id} className="hover:bg-base-200 transition-colors">
                                    <td className="font-bold text-gray-400">{index + 1 + (currentPage * size)}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="badge badge-error badge-outline font-black">{request.bloodGroup}</div>
                                            <div className="font-bold">{request.recipientName}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm opacity-70 font-semibold">{request.recipientDistrict}</div>
                                        <div className="text-xs opacity-50">{request.hospitalName}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium">{request.donationDate}</div>
                                        <div className="text-xs text-red-400">{request.donationTime}</div>
                                    </td>
                                    <td>
                                        <span className={`badge ${statusClasses[request.status] || 'badge-ghost'} font-bold p-3`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => { setSelectedRequest(request); document.getElementById('view_request_modal').showModal(); }}
                                                className="btn btn-sm btn-circle btn-ghost text-blue-500" title="View Details"
                                            >
                                                <FaEye size={18} />
                                            </button>

                                            {request.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusChange(request._id, 'inprogress')}
                                                    className="btn btn-sm btn-info text-white rounded-lg flex items-center gap-1"
                                                >
                                                    <FaHandHoldingHeart /> Accept
                                                </button>
                                            )}

                                            {request.status === 'inprogress' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(request._id, 'done')}
                                                        className="btn btn-sm btn-success text-white rounded-lg" title="Mark Done"
                                                    >
                                                        <FaCheckCircle /> Done
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(request._id, 'canceled')}
                                                        className="btn btn-sm btn-error text-white rounded-lg" title="Cancel"
                                                    >
                                                        <FaTimesCircle />
                                                    </button>
                                                </>
                                            )}

                                            <Link to={`/dashboard/edit-request/${request._id}`} className="btn btn-sm btn-circle btn-ghost text-orange-400">
                                                <FaEdit size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(request._id)} className="btn btn-sm btn-circle btn-ghost text-red-400">
                                                <FaTrashAlt size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400 font-bold">No Requests Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {numberOfPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? 'btn-error text-white' : ''}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Modal */}
            <dialog id="view_request_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl rounded-3xl">
                    {selectedRequest && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-4">
                                <h3 className="text-2xl font-black text-neutral">Request Details</h3>
                                <div className="badge badge-error p-4 text-white font-bold text-lg">{selectedRequest.bloodGroup}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-400 uppercase font-bold">Recipient Info</p>
                                    <p className="font-bold">Name: <span className="font-medium">{selectedRequest.recipientName}</span></p>
                                    <p className="font-bold">Hospital: <span className="font-medium">{selectedRequest.hospitalName}</span></p>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-400 uppercase font-bold">Location & Time</p>
                                    <p className="font-bold">Date: <span className="font-medium">{selectedRequest.donationDate}</span></p>
                                    <p className="font-bold">Time: <span className="font-medium text-red-500">{selectedRequest.donationTime}</span></p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                                <p className="text-sm text-gray-400 uppercase font-bold mb-2">Message</p>
                                <p className="italic text-gray-700">"{selectedRequest.requestMessage}"</p>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-neutral px-8 rounded-xl">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AllBloodDonationRequests;