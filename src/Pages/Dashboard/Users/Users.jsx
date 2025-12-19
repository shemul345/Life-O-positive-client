import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUserCheck, FaUserShield } from 'react-icons/fa';
import { MdBlock, MdVolunteerActivism, MdOutlineAdminPanelSettings, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [filterStatus, setFilterStatus] = useState('all');
    const itemsPerPage = 15;

    const { refetch, data: usersData = { result: [], count: 0 }, isLoading } = useQuery({
        queryKey: ['users', currentPage, filterStatus],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&size=${itemsPerPage}&status=${filterStatus}`);
            return res.data;
        }
    });

    const { result: users, count } = usersData;
    const numberOfPages = count > 0 ? Math.ceil(count / itemsPerPage) : 0;
    const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];

    const handleStatusChange = (user, newStatus) => {
        Swal.fire({
            title: `Confirm ${newStatus}?`,
            text: `Do you want to ${newStatus} this user?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: newStatus === 'blocked' ? '#d33' : '#28a745',
            confirmButtonText: `Yes, ${newStatus}!`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/status/${user._id}`, { status: newStatus })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire("Success!", `User is now ${newStatus}.`, "success");
                        }
                    });
            }
        });
    };

    const handleRoleChange = (user, newRole) => {
        Swal.fire({
            title: "Update Role?",
            text: `Promote/Demote this user to ${newRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Update"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire("Updated!", "Role has been changed.", "success");
                        }
                    });
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "User removed successfully.", "success");
                        }
                    });
            }
        });
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-bars loading-lg text-primary"></span></div>;

    return (
        <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-200">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className='text-4xl font-extrabold text-neutral'>User Directory</h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage and monitor all platform members ({count})</p>
                </div>

                <div className="flex items-center gap-4 bg-base-200 p-2 rounded-2xl">
                    <span className="pl-3 text-sm font-bold text-gray-400">FILTER:</span>
                    <select
                        value={filterStatus}
                        onChange={(e) => {
                            setFilterStatus(e.target.value);
                            setCurrentPage(0);
                        }}
                        className="select select-ghost focus:bg-transparent font-bold text-neutral"
                    >
                        <option value="all">All Members</option>
                        <option value="active" className="text-success">Active Only</option>
                        <option value="blocked" className="text-error">Blocked Only</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}

            <div className="overflow-x-auto rounded-2xl border border-base-200 shadow-inner bg-base-50">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-neutral text-white">
                        <tr>
                            <th className="rounded-tl-none">#</th>
                            <th>User Info</th>
                            <th>Role Status</th>
                            <th className="text-center">Set Role</th>
                            <th className="text-center">Account Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={u._id} className="hover:bg-base-200 transition-colors border-b border-base-200 last:border-0">
                                <td className="font-bold text-gray-400">
                                    {(currentPage * itemsPerPage) + (i + 1)}
                                </td>
                                <td>
                                    <div className="flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12 border-2 border-primary/20 shadow-sm">
                                                <img src={u.avatar || u.photoURL || 'https://i.ibb.co/mR7099X/user.png'} alt="User Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-neutral text-lg">{u.name}</div>
                                            <div className="text-sm opacity-60 font-medium">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <span className={`badge badge-sm font-bold uppercase py-2 ${u.role === 'admin' ? 'badge-error text-white' :
                                                u.role === 'volunteer' ? 'badge-info text-white' : 'badge-ghost'
                                            }`}>
                                            {u.role}
                                        </span>
                                        <span className={`badge badge-xs gap-1 border-none py-2 ${u.status === 'blocked' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                            <div className={`h-1.5 w-1.5 rounded-full ${u.status === 'blocked' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                            {u.status || 'active'}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <div className="tooltip" data-tip="Make Admin">
                                            <button
                                                onClick={() => handleRoleChange(u, 'admin')}
                                                disabled={u.role === 'admin'}
                                                className="btn btn-sm btn-circle btn-outline btn-error hover:text-white"
                                            >
                                                <MdOutlineAdminPanelSettings size={18} />
                                            </button>
                                        </div>
                                        <div className="tooltip" data-tip="Make Volunteer">
                                            <button
                                                onClick={() => handleRoleChange(u, 'volunteer')}
                                                disabled={u.role === 'volunteer'}
                                                className="btn btn-sm btn-circle btn-outline btn-info hover:text-white"
                                            >
                                                <MdVolunteerActivism size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-3">
                                        {u.status === 'blocked' ? (
                                            <button
                                                onClick={() => handleStatusChange(u, 'active')}
                                                className="btn btn-sm btn-success text-white px-4 rounded-full"
                                            >
                                                <FaUserCheck className="mr-1" /> Unblock
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleStatusChange(u, 'blocked')}
                                                className="btn btn-sm btn-warning text-white px-4 rounded-full"
                                            >
                                                <MdBlock className="mr-1" /> Block
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteUser(u)}
                                            className="btn btn-sm btn-ghost text-red-400 hover:bg-red-50 hover:text-red-600 rounded-full"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {numberOfPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-3 mt-12 mb-4">
                    <button
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        className="btn btn-sm btn-circle btn-ghost border border-base-300 shadow-sm"
                    >
                        <MdChevronLeft size={24} />
                    </button>

                    <div className="join shadow-sm border border-base-300">
                        {pages.map(p => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`join-item btn btn-sm px-5 ${currentPage === p ? 'btn-neutral' : 'btn-ghost'}`}
                            >
                                {p + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(Math.min(numberOfPages - 1, currentPage + 1))}
                        disabled={currentPage === numberOfPages - 1}
                        className="btn btn-sm btn-circle btn-ghost border border-base-300 shadow-sm"
                    >
                        <MdChevronRight size={24} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Users;