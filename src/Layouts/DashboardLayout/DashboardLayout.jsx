import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { BiDonateBlood, BiSolidDashboard } from "react-icons/bi";
import { FaUsers, FaPlusCircle, FaRegUserCircle, FaHome } from 'react-icons/fa';
import { MdBloodtype, MdOutlineFormatListBulleted } from 'react-icons/md';
import { IoSettingsOutline } from "react-icons/io5";
import useRole from '../../hooks/useRole';
import Loader from '../../components/Loader/Loader';

const DashboardLayout = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loader />

    return (
        <div className="drawer lg:drawer-open max-w-full mx-auto bg-gray-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Dashboard Navbar */}
                <nav className="navbar w-full bg-white border-b px-4 py-3 sticky top-0 z-10">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold ml-2">
                            Life <span className='text-red-600'>O+</span> <span className="text-gray-500 font-medium">| Dashboard</span>
                        </h1>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="p-6 md:p-8 flex-grow">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="menu p-4 w-72 min-h-full bg-white border-r text-base-content">
                    <div className="mb-8 px-4 py-2">
                        <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
                            <MdBloodtype /> Life O+
                        </h2>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">{role} Panel</p>
                    </div>

                    <ul className="space-y-2">
                        {/* Common for All Roles */}
                        <li>
                            <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600 font-bold' : 'hover:bg-gray-100'}`}>
                                <BiSolidDashboard className="text-xl" /> Dashboard Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600 font-bold' : 'hover:bg-gray-100'}`}>
                                <FaRegUserCircle className="text-xl" /> Profile
                            </NavLink>
                        </li>

                        <div className="divider opacity-50">Menu</div>

                        {/* Donor Specific */}
                        {role === 'donor' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/my-donation-requests" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600 font-bold' : 'hover:bg-gray-100'}`}>
                                        <BiDonateBlood className="text-xl" /> My Donation Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/create-donation-request" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600 font-bold' : 'hover:bg-gray-100'}`}>
                                        <FaPlusCircle className="text-xl" /> Create Request
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Admin & Volunteer Specific */}
                        {(role === 'admin' || role === 'volunteer') && (
                            <li>
                                <NavLink to="/dashboard/all-blood-donation-requests" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600 font-bold' : 'hover:bg-gray-100'}`}>
                                    <MdOutlineFormatListBulleted className="text-xl" /> All Blood Requests
                                </NavLink>
                            </li>
                        )}

                        {/* Admin Only */}
                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/users" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600 font-bold' : 'hover:bg-gray-100'}`}>
                                        <FaUsers className="text-xl" /> All Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/content-management" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600 font-bold' : 'hover:bg-gray-100'}`}>
                                        <MdBloodtype className="text-xl" /> Content Management
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Footer Nav */}
                    <div className="mt-auto pt-5 space-y-2 border-t">
                        <li>
                            <NavLink to="/" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-all">
                                <FaHome className="text-xl" /> Back to Home
                            </NavLink>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;