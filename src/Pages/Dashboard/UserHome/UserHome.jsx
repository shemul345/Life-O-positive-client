import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaHeartbeat, FaCalendarCheck, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // ইউজারের বিস্তারিত তথ্য লোড করা
    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/profile/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-error"></span></div>;

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-black">Welcome Back, {user?.displayName}!</h1>
                    <p className="mt-2 text-red-50 font-medium opacity-90">Your contribution saves lives. Check your activity below.</p>
                    <div className="mt-6 flex gap-3">
                        <Link to="/dashboard/my-donation-requests" className="btn btn-sm bg-white text-red-600 border-none hover:bg-red-50">My Requests</Link>
                        <Link to="/donation-request" className="btn btn-sm btn-outline text-white hover:bg-white hover:text-red-600">New Request</Link>
                    </div>
                </div>
                {/* Decorative Icon */}
                <FaHeartbeat className="absolute -right-10 -bottom-10 text-[200px] text-white opacity-10 rotate-12" />
            </div>

            {/* Quick Info Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || 'https://i.ibb.co/mR7099X/user.png'} alt="Profile" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg">{userData.name}</h3>
                        <p className="text-gray-400 text-sm">{userData.district}, {userData.upazila}</p>
                    </div>
                </div>

                {/* Blood Group Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase">Blood Group</p>
                        <h3 className="text-3xl font-black text-red-600">{userData.bloodGroup || 'N/A'}</h3>
                    </div>
                    <div className="text-4xl text-red-100"><FaHeartbeat /></div>
                </div>

                {/* Account Status Card */}
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

            {/* Profile Action Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 text-center md:text-left">
                    <div className="bg-gray-50 p-4 rounded-full text-gray-400 text-3xl"><FaUserCircle /></div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-800">Complete Your Profile</h4>
                        <p className="text-gray-500">Keeping your information updated helps us reach you faster in emergencies.</p>
                    </div>
                </div>
                <Link to={`/dashboard/profile`} className="btn btn-neutral rounded-xl px-8">
                    <FaEdit /> Edit Profile
                </Link>
            </div>
        </div>
    );
};

export default UserHome;