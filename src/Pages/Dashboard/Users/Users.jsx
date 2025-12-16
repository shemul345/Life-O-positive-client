import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import { TbShieldOff } from "react-icons/tb";
import { MdRemoveDone, MdVolunteerActivism } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: 'admin' }

        Swal.fire({
                    title: "Are you sure?",
                    text: `You have make ${user.displayName} as an Admin`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Maked Admin"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.modifiedCount) {
                                refetch()
                                Swal.fire({
                                    title: "Congratulations!",
                                    text: `${user.displayName} marked as an Admin`,
                                    icon: "success",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                            }
                        })
                }
        })
        
    }

    const handleMakeVolunteer = (user)=>{
        const roleInfo = { role: 'volunteer' }

        Swal.fire({
            title: "Are you sure?",
            text: `You have make ${user.displayName} as an Volunteer`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Maked Volunteer"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.modifiedCount) {
                                refetch()
                                Swal.fire({
                                    title: "Congratulations!",
                                    text: `${user.displayName} marked as an Volunteer`,
                                    icon: "success",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                            }
                        })
                }
            })

    }

    const handleRemoveDonor = (user) => {
        const roleInfo = { role: 'donor' }

        Swal.fire({
            title: "Are you sure?",
            text: `You have make ${user.displayName} as a Donor`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Donor"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.modifiedCount) {
                                refetch()
                                Swal.fire({
                                    title: "Oops",
                                    text: `${user.displayName} remove from Admin`,
                                    icon: "error",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                            }
                        })
                }
        })
        
    }

    const handleDeleteUser = (user) => {
        Swal.fire({
                    title: "Are you sure?",
                    text:`You have deleted ${user.displayName} from database`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                })
                    .then((result) => {
                    if (result.isConfirmed) {
        
                        axiosSecure.delete(`/users/${user._id}`)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.deletedCount) {
                                    refetch();
                                    Swal.fire({
                                        title: "Successfully",
                                        text: `${user.displayName} has been deleted`,
                                        icon: "success",
                                        timer: 2000,
                                        showConfirmButton:false
                                    });
                                }
                            })
                    }
                });
    }

    return (
        <div>
            <h1 className='text-2xl font-bold ml-10 mb-5'>All Users({users.length})</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name & Photo</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u, i) => <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={u.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{u.displayName}</div>
                                            <div className="text-sm opacity-50">Bangladesh</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <button className='btn btn-square hover:bg-primary hover:text-white'>
                                        view
                                    </button>
                                    {
                                        u.role === 'admin' ? <button
                                            onClick={() => handleRemoveDonor(u)}
                                            className='btn btn-square hover:bg-red-600 bg-red-400 text-white mx-2 tooltip'
                                        data-tip='Remove Admin'>
                                            <TbShieldOff />
                                        </button> :
                                            <button
                                                onClick={() => handleMakeAdmin(u)}
                                                className='btn btn-square hover:bg-green-800 bg-green-500 text-white mx-2 tooltip'
                                                data-tip='Make Admin'>
                                                <RiAdminFill />
                                            </button>
                                    }

                                    {
                                        u.role === 'volunteer' ? <button
                                            onClick={() => handleRemoveDonor(u)}
                                            className='btn btn-square hover:bg-red-600 bg-red-400 text-white mx-2 tooltip'
                                            data-tip='Remove Volunteer'>
                                            <MdRemoveDone />
                                        </button> :
                                            <button
                                                onClick={() => handleMakeVolunteer(u)}
                                                className='btn btn-square hover:bg-green-800 bg-green-500 text-white mx-2 tooltip'
                                                data-tip='Make Volunteer'>
                                                <MdVolunteerActivism />
                                            </button>
                                    }
                                    <button
                                        onClick={() => handleDeleteUser(u)}
                                        className='btn btn-square hover:bg-primary hover:text-white'>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;