import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt, FaEye, FaCheckCircle, FaTimesCircle, FaHandHoldingHeart } from 'react-icons/fa';
import { Link } from 'react-router';
import useRole from '../../../hooks/useRole';

const AllBloodDonationRequests = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [role] = useRole();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const size = 15;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allBloodDonationRequests', filter, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-requests?status=${filter}&page=${currentPage}&size=${size}`);
            return res.data;
        }
    });

    const requests = data?.result || [];
    const totalCount = data?.count || 0;
    const numberOfPages = Math.ceil(totalCount / size);
    const pages = [...Array(numberOfPages).keys()];

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
                        setCurrentPage(0);
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
                                            {/* Everyone can see */}
                                            <button
                                                onClick={() => { setSelectedRequest(request); document.getElementById('view_request_modal').showModal(); }}
                                                className="btn btn-sm btn-circle btn-ghost text-blue-500" title="View Details"
                                            >
                                                <FaEye size={18} />
                                            </button>

                                            {/* Allowed for both Admin and Volunteer */}
                                            {(role === 'admin' || role === 'volunteer') && (
                                                <>
                                                    {request.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleStatusChange(request._id, 'inprogress')}
                                                            className="btn btn-sm btn-info text-white rounded-lg flex items-center gap-1"
                                                        >
                                                            <FaHandHoldingHeart /> Accept
                                                        </button>
                                                    )}

                                                    {request.status === 'inprogress' && (
                                                        <div className="flex gap-1">
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
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {/* Restricted to admin only */}
                                            {role === 'admin' && (
                                                <Link to={`/dashboard/edit-request/${request._id}`} className="btn btn-sm btn-circle btn-ghost text-orange-400" title="Edit Request">
                                                    <FaEdit size={16} />
                                                </Link>
                                            )}

                                            {/* Restricted to Admin only */}
                                            {role === 'admin' && (
                                                <button
                                                    onClick={() => handleDelete(request._id)}
                                                    className="btn btn-sm btn-circle btn-ghost text-red-400"
                                                    title="Delete Request"
                                                >
                                                    <FaTrashAlt size={16} />
                                                </button>
                                            )}
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
                <div className="modal-box max-w-2xl rounded-3xl border-t-8 border-red-500 p-0 overflow-hidden">
                    {selectedRequest && (
                        <div>
                            {/* Modal Header */}
                            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Request Details</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Requester: {selectedRequest.requesterName}</p>
                                </div>
                                <div className="badge badge-error p-4 text-white font-bold text-xl shadow-md">
                                    {selectedRequest.bloodGroup}
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Recipient Info</p>
                                        <p className="font-bold text-gray-700">Name: <span className="font-medium text-gray-600">{selectedRequest.recipientName}</span></p>
                                        <p className="font-bold text-gray-700">Contact: <span className="font-medium text-gray-600">{selectedRequest.recipientContactNo}</span></p>
                                        <p className="font-bold text-gray-700">Hospital: <span className="font-medium text-gray-600">{selectedRequest.hospitalName}</span></p>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Donation Schedule</p>
                                        <p className="font-bold text-gray-700">Date: <span className="font-medium text-gray-600">{selectedRequest.donationDate}</span></p>
                                        <p className="font-bold text-gray-700">Time: <span className="font-medium text-red-500">{selectedRequest.donationTime}</span></p>
                                        <p className="font-bold text-gray-700">Location: <span className="font-medium text-gray-600">{selectedRequest.recipientDistrict}, {selectedRequest.recipientUpazila}</span></p>
                                    </div>
                                </div>

                                {/* Message Section */}
                                <div className="bg-gray-50 p-5 rounded-2xl border border-dashed border-gray-300">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Patient Condition / Message</p>
                                    <p className="italic text-gray-600 text-sm leading-relaxed text-justify">"{selectedRequest.requestMessage}"</p>
                                </div>

                                {/* Accepted Status */}
                                {selectedRequest.donationStatus === 'inprogress' && (
                                    <div className="alert bg-blue-600 rounded-2xl py-3 border-none text-white shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <FaUserCircle className="text-2xl" />
                                            <p className="text-sm font-bold uppercase">Accepted By: {selectedRequest.donorName || "A Volunteer"}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Modal Action */}
                    <div className="p-6 bg-gray-50/50 border-t flex justify-end">
                        <form method="dialog">
                            <button className="btn btn-neutral px-10 rounded-xl font-bold uppercase tracking-widest shadow-lg">Close</button>
                        </form>
                    </div>
                </div>
                {/* Backdrop to close by clicking outside */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default AllBloodDonationRequests;