import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/Loader/Loader';
import Swal from 'sweetalert2';
import { FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUserAlt } from 'react-icons/fa';

const DonationRequestDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: request = {}, isLoading } = useQuery({
        queryKey: ['requestDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donation-requests/${id}`);
            return res.data;
        }
    });

    const handleConfirmDonation = async () => {
        // যদি লগইন না থাকে
        if (!user) {
            return navigate('/login');
        }

        const { value: formValues } = await Swal.fire({
            title: 'Confirm Donation',
            html:
                `<p><b>Donor Name:</b> ${user?.displayName}</p>` +
                `<p><b>Donor Email:</b> ${user?.email}</p>`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: '#EF4444',
        });

        if (formValues) {
            try {
                const donationInfo = {
                    status: 'inprogress',
                    donorName: user?.displayName,
                    donorEmail: user?.email
                };

                const res = await axiosSecure.patch(`/donation-requests/status/${id}`, donationInfo);
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Success!', 'Thank you for accepting the request. Please contact the requester.', 'success');
                    navigate('/dashboard/my-donation-requests'); // অথবা অন্য কোনো পেজ
                }
            } catch {
                Swal.fire('Error', 'Something went wrong!', 'error');
            }
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto my-16 px-4">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-red-600 p-8 text-white text-center">
                    <div className="w-20 h-20 bg-white text-red-600 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg">
                        {request.bloodGroup}
                    </div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight">Blood Needed Urgently</h1>
                </div>

                <div className="p-8 space-y-8">
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-400 uppercase flex items-center gap-2 border-b pb-2">
                                <FaUserAlt /> Patient Info
                            </h3>
                            <p className="text-xl font-bold">Recipient: <span className="font-medium text-gray-700">{request.recipientName}</span></p>
                            <p className="text-xl font-bold text-red-600 italic">" {request.requestMessage} "</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-400 uppercase flex items-center gap-2 border-b pb-2">
                                <FaHospital /> Hospital & Time
                            </h3>
                            <p className="flex items-center gap-2 font-bold"><FaHospital className="text-red-500" /> {request.hospitalName}</p>
                            <p className="flex items-center gap-2 font-bold"><FaMapMarkerAlt className="text-red-500" /> {request.recipientDistrict}</p>
                            <p className="flex items-center gap-2 font-bold"><FaCalendarAlt className="text-red-500" /> {request.donationDate}</p>
                            <p className="flex items-center gap-2 font-bold"><FaClock className="text-red-500" /> {request.donationTime}</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-8 border-t">
                        {request.status === 'pending' ? (
                            <button
                                onClick={handleConfirmDonation}
                                className="btn btn-error btn-block text-white text-lg font-black rounded-2xl h-16 shadow-lg shadow-red-200"
                            >
                                Confirm Donation
                            </button>
                        ) : (
                            <div className="alert alert-info rounded-2xl font-bold text-white">
                                This request has already been accepted by someone else.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationRequestDetails;