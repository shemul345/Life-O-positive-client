import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import Loader from '../../../components/Loader/Loader';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyDonationRequests = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedRequest, setSelectedRequest] = useState(null);

    const statusBgMap = {
        pending: 'bg-orange-600',
        inprogress: 'bg-blue-600',
        done: 'bg-green-600',
        canceled: 'bg-red-600',
    };

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['myDonationRequests', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests?email=${user?.email}`);
            return res.data;
        }
    });

    const handleDeleteDonationRequest = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donation-requests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Request has been deleted.", "success");
                        }
                    })
                    .catch(() => Swal.fire("Error", "Failed to delete", "error"));
            }
        });
    };

    if (loading || isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-4 md:p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className='text-3xl font-black text-gray-800 uppercase tracking-tight'>
                    My Donation <span className="text-red-600">Requests</span>
                </h1>
                <Link to="/donation-request" className="btn btn-error btn-sm text-white">
                    Create New Request
                </Link>
            </div>

            <div className="overflow-x-auto shadow-sm border border-gray-100 rounded-2xl">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th>SL</th>
                            <th>Recipient Name</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((request, index) => (
                                <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="font-bold text-gray-400">{index + 1}</td>
                                    <td className="font-semibold text-gray-700">{request.recipientName}</td>
                                    <td>
                                        <span className="badge badge-error badge-outline font-bold">{request.bloodGroup}</span>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider ${statusBgMap[request.status] || 'bg-gray-400'}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="flex justify-center gap-2">
                                        {/* View Modal Button */}
                                        <button
                                            onClick={() => {
                                                setSelectedRequest(request);
                                                document.getElementById('view_request_modal').showModal();
                                            }}
                                            className="btn btn-sm btn-circle btn-ghost text-blue-500"
                                            title="View Details"
                                        >
                                            <FaEye size={18} />
                                        </button>

                                        {/* Edit Button */}
                                        <Link
                                            to={`/dashboard/edit-request/${request._id}`}
                                            className='btn btn-sm btn-circle btn-ghost text-orange-500'
                                            title="Edit"
                                        >
                                            <FaEdit size={18} />
                                        </Link>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteDonationRequest(request._id)}
                                            className='btn btn-sm btn-circle btn-ghost text-red-500'
                                            title="Delete"
                                        >
                                            <FaTrashAlt size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-400 font-medium">
                                    You haven't created any donation requests yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ===== VIEW MODAL ===== */}
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

export default MyDonationRequests;