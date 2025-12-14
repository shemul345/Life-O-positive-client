import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import Loader from '../../../components/Loader/Loader';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const statusBgMap = {
        pending: 'bg-orange-700',
        'in-progress': 'bg-yellow-700',
        done: 'bg-green-700',
        cancelled: 'bg-red-700',
    };

    const {data: requests=[], refetch } = useQuery({
        queryKey: ['myDonationRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests?email=${user?.email}`)
            return res.data
        }
    });

    if (loading) {
        return <Loader></Loader>
    }
    // console.log(requests)

    const handleDeleteDonationRequest = (id) => {
        // console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You have deleted this blood donation request!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/donation-requests/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your donation request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <h1 className='text-2xl font-bold ml-10 mb-5'>My donation requests</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='text-black'>
                            <th>SL No.</th>
                            <th>Receipent Name</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((request, index) => <tr key={index}>
                            <td>{ index+1}</td>
                            <td>{request.recipientName}</td>
                                <td>{request.bloodGroup}</td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded text-white text-sm capitalize ${statusBgMap[request.status] || 'bg-gray-600'
                                            }`}
                                    >
                                        {request.status}
                                        </span>
                                </td>
                                <td>
                                    <button className='btn btn-square hover:bg-primary hover:text-white'>
                                        view
                                    </button>
                                    <button className='btn btn-square hover:bg-primary hover:text-white mx-2'>
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDonationRequest(request._id)}
                                        className='btn btn-square hover:bg-primary hover:text-white'>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                        </tr>
                       )}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonationRequests;