import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import { TbShieldOff } from "react-icons/tb";
import { MdRemoveDone, MdVolunteerActivism } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

const Users = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data;
        }
    })
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
                                            <div className="font-bold">{u.name}</div>
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
                                        u.role === 'admin' ? <button className='btn btn-square hover:bg-primary hover:text-white mx-2 tooltip'
                                            data-tip='Remove Admin'>
                                            <TbShieldOff />
                                        </button> : 
                                            <button className='btn btn-square hover:bg-primary hover:text-white mx-2 tooltip'
                                                data-tip='Make Admin'>
                                                <RiAdminFill />
                                            </button>
                                    }

                                    {
                                        u.role === 'volunteer' ? <button className='btn btn-square hover:bg-primary hover:text-white mx-2 tooltip'
                                            data-tip='Remove Volunteer'>
                                            <MdRemoveDone />
                                        </button> :
                                            <button className='btn btn-square hover:bg-primary hover:text-white mx-2 tooltip'
                                                data-tip='Make Volunteer'>
                                                <MdVolunteerActivism />
                                            </button>
                                    }
                                    <button
                                        // onClick={() => handleDeleteDonationRequest(request._id)}
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