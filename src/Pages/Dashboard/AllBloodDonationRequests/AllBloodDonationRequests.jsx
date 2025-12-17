import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AllBloodDonationRequests = () => {
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [selectedRequest, setSelectedRequest] = useState(null);

    const statusBgMap = {
        pending: 'bg-orange-700',
        'in-progress': 'bg-yellow-700',
        done: 'bg-green-700',
        cancelled: 'bg-red-700',
    };

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['allBloodDonationRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-blood-donation-requests');
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold ml-10 mb-5">
                All Blood Donation Requests
            </h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className="text-black">
                            <th>SL</th>
                            <th>Recipient Name</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.recipientName}</td>
                                <td>{request.bloodGroup}</td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded text-white text-sm capitalize ${statusBgMap[request.status] ||
                                            'bg-gray-600'
                                            }`}
                                    >
                                        {request.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setSelectedRequest(request);
                                            document
                                                .getElementById(
                                                    'view_request_modal'
                                                )
                                                .showModal();
                                        }}
                                    >
                                        View
                                    </button>

                                    <button className="btn btn-square hover:bg-primary hover:text-white">
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ===== SINGLE DYNAMIC MODAL ===== */}
            <dialog id="view_request_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    {selectedRequest && (
                        <>
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold">
                                    {selectedRequest.recipientName}
                                </h3>
                                <p className="text-xl font-bold">
                                    Blood Group:{' '}
                                    <span className="text-red-600">
                                        {selectedRequest.bloodGroup}
                                    </span>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xl font-bold mb-3">
                                        Address Information
                                    </h4>
                                    <p>
                                        District:{' '}
                                        {
                                            selectedRequest.recipientDistrict
                                        }
                                    </p>
                                    <p>
                                        Upazila:{' '}
                                        {
                                            selectedRequest.recipientUpazila
                                        }
                                    </p>
                                    <p>
                                        Hospital:{' '}
                                        {selectedRequest.hospitalName}
                                    </p>
                                    <p>
                                        Local Address:{' '}
                                        {selectedRequest.fullAddress}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold mb-3">
                                        Patient Information
                                    </h4>
                                    <p>
                                        Contact:{' '}
                                        {
                                            selectedRequest
                                                .recipientContactNo
                                        }
                                    </p>
                                    <p>
                                        Donation Date:{' '}
                                        {selectedRequest.donationDate}
                                    </p>
                                    <p>
                                        Donation Time:{' '}
                                        {selectedRequest.donationTime}
                                    </p>
                                    <p>
                                        Condition:{' '}
                                        {selectedRequest.requestMessage}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AllBloodDonationRequests;
