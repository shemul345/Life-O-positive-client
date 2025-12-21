import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { BiDonateBlood, BiSolidDashboard } from "react-icons/bi";
import { FaUsers, FaPlusCircle, FaRegUserCircle, FaHome } from 'react-icons/fa';
import { MdBloodtype, MdManageAccounts, MdOutlineFormatListBulleted} from 'react-icons/md';
import Loader from '../../components/Loader/Loader';
import useRole from '../../hooks/useRole';

const DashboardLayout = () => {
    const [role, roleLoading] = useRole();

    if (roleLoading) return <Loader />

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600 font-bold shadow-sm' : 'hover:bg-gray-100 text-gray-600'
        }`;

    return (
        <div className="drawer lg:drawer-open bg-gray-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col min-h-screen">
                {/* Dashboard Navbar */}
                <nav className="navbar w-full bg-white border-b px-6 py-3 sticky top-0 z-10 shadow-sm">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">
                            Life <span className='text-red-600'>O+</span>
                            <span className="text-gray-400 font-medium text-sm ml-2 hidden sm:inline">| {role?.toUpperCase()} DASHBOARD</span>
                        </h1>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="menu p-5 w-72 min-h-full bg-white border-r text-base-content shadow-xl">
                    <div className="mb-10 px-2">
                        <h2 className="text-2xl font-black text-red-600 flex items-center gap-2">
                            <MdBloodtype className="text-3xl" /> Life O+
                        </h2>
                        <div className="badge badge-neutral mt-2 text-[10px] uppercase tracking-tighter">{role} Control Panel</div>
                    </div>

                    <ul className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 ml-4 mb-2 uppercase tracking-widest">General</p>
                        <li><NavLink to="/dashboard" end className={navLinkClass}><BiSolidDashboard size={20} /> Dashboard Home</NavLink></li>
                        <li><NavLink to="/dashboard/profile" className={navLinkClass}><FaRegUserCircle size={20} /> My Profile</NavLink></li>

                        <div className="divider opacity-30 my-4"></div>
                        <p className="text-[10px] font-bold text-gray-400 ml-4 mb-2 uppercase tracking-widest">Management</p>

                        {/* ALL role links */}   
                        <li><NavLink to="/dashboard/my-donation-requests" className={navLinkClass}><BiDonateBlood size={20} /> My Requests</NavLink></li>
                        <li><NavLink to="/donation-request" className={navLinkClass}><FaPlusCircle size={20} /> Create Request</NavLink></li>
                            
                        {/* Admin or Volunteer Specific */}
                        {(role === 'admin' || role === 'volunteer') && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/all-blood-donation-requests" className={navLinkClass}>
                                        <MdOutlineFormatListBulleted size={20} /> All Requests
                                    </NavLink>
                                </li>
                            </>
                        )}
                        
                        {/* Only Admin Specific */}
                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/users" className={navLinkClass}>
                                        <FaUsers size={20} /> All Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/content-management" className={navLinkClass}>
                                        <MdManageAccounts size={20} /> Content Management
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Exit */}
                    <div className="mt-auto pt-5 border-t">
                        <li><NavLink to="/" className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all font-medium text-gray-500"><FaHome size={20} /> Return Home</NavLink></li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;