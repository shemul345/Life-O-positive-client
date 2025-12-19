import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaHeartbeat, FaCalendarCheck, FaUserCircle, FaEye, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router';

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedRequest, setSelectedRequest] = useState(null);

    const { data: userData = {}, isLoading: isProfileLoading } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/profile/${user?.email}`);
            return res.data;
        }
    });

    const { data: recentRequests = [], isLoading: isRequestsLoading } = useQuery({
        queryKey: ['recentRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/recent-requests/${user?.email}`);
            return res.data;
        }
    });

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        document.getElementById('view_request_modal').showModal();
    };

    if (isProfileLoading || isRequestsLoading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-error"></span></div>;

    return (
        <div className="space-y-8 animate-fadeIn mb-10">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-black">Welcome Back, {user?.displayName}!</h1>
                    <p className="mt-2 text-red-50 font-medium opacity-90">Your contribution saves lives. Check your activity below.</p>
                </div>
                <FaHeartbeat className="absolute -right-10 -bottom-10 text-[200px] text-white opacity-10 rotate-12" />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                            <img src={userData.avatar || 'https://i.ibb.co/mR7099X/user.png'} alt="Profile" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg">{userData.name}</h3>
                        <p className="text-gray-400 text-sm">{userData.district}, {userData.upazila}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase">Blood Group</p>
                        <h3 className="text-3xl font-black text-red-600">{userData.bloodGroup || 'N/A'}</h3>
                    </div>
                    <div className="text-4xl text-red-100"><FaHeartbeat /></div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase">Status</p>
                        <div className={`badge font-bold py-3 mt-1 ${userData.status === 'blocked' ? 'badge-error' : 'badge-success text-white'}`}>
                            {userData.status?.toUpperCase() || 'ACTIVE'}
                        </div>
                    </div>
                    <div className="text-4xl text-blue-100"><FaCalendarCheck /></div>
                </div>
            </div>

            {/* Recent Requests Table */}
            {recentRequests.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">Recent Donation Requests</h3>
                        <Link to="/dashboard/my-donation-requests" className="text-red-600 font-bold text-sm hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-50/50">
                                <tr className="text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 text-left">Recipient</th>
                                    <th>Location</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentRequests.map((request) => (
                                    <tr key={request._id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">{request.recipientName}</div>
                                            <div className="text-[10px] text-red-500 font-black tracking-widest">{request.bloodGroup}</div>
                                        </td>
                                        <td className="text-sm text-gray-600">
                                            {request.recipientDistrict}, {request.recipientUpazila}
                                        </td>
                                        <td className="text-sm">
                                            <div className="text-gray-800 font-medium">{request.donationDate}</div>
                                            <div className="text-gray-400 text-xs">{request.donationTime}</div>
                                        </td>
                                        <td>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase
                                                ${request.donationStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    request.donationStatus === 'inprogress' ? 'bg-blue-100 text-blue-700' :
                                                        request.donationStatus === 'done' ? 'bg-green-100 text-green-700' :
                                                            'bg-gray-100 text-gray-700'}`}>
                                                {request.donationStatus}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleViewDetails(request)}
                                                className="btn btn-ghost btn-xs text-gray-400 hover:text-red-500"
                                            >
                                                <FaEye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Profile Action Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 text-center md:text-left">
                    <div className="bg-gray-50 p-4 rounded-full text-gray-400 text-3xl"><FaUserCircle /></div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-800">Complete Your Profile</h4>
                        <p className="text-gray-500 text-sm">Keeping your information updated helps us reach you faster in emergencies.</p>
                    </div>
                </div>
                <Link to={`/dashboard/profile`} className="btn btn-neutral rounded-xl px-8">
                    <FaEdit /> Edit Profile
                </Link>
            </div>

            {/* --- MODAL SECTION --- */}
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

export default UserHome;