import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers, FaHandHoldingHeart, FaDonate } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // TanStack Query ব্যবহার করা ভালো কারণ এটি ক্যাশিং হ্যান্ডেল করে
    const { data: stats = { donorsCount: 0, requestsCount: 0, totalFunding: 0 }, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const data = [
        { name: 'Donors', count: stats.donorsCount, color: '#EF4444' },
        { name: 'Requests', count: stats.requestsCount, color: '#F97316' },
        { name: 'Funding', count: stats.totalFunding, color: '#10B981' },
    ];

    if (isLoading) return <div className="p-10 text-center"><span className="loading loading-spinner text-error"></span></div>;

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        Welcome Back, <span className="text-red-600">{user?.displayName || 'Admin'}</span>! 👋
                    </h1>
                    <p className="text-gray-500 font-medium">System analytics for Life O+ platform.</p>
                </div>
                <div className="badge badge-error text-white p-4 font-bold">ADMIN PANEL</div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Total Donors Card */}
                <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow border-b-4 border-red-500 overflow-hidden">
                    <div className="card-body flex-row items-center gap-6 p-8">
                        <div className="p-4 bg-red-50 rounded-2xl text-red-500 text-4xl shadow-inner"><FaUsers /></div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Donors</p>
                            <h3 className="text-3xl font-black text-gray-800">{stats.donorsCount}</h3>
                        </div>
                    </div>
                </div>

                {/* Requests Card */}
                <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow border-b-4 border-orange-500 overflow-hidden">
                    <div className="card-body flex-row items-center gap-6 p-8">
                        <div className="p-4 bg-orange-50 rounded-2xl text-orange-500 text-4xl shadow-inner"><FaHandHoldingHeart /></div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Requests</p>
                            <h3 className="text-3xl font-black text-gray-800">{stats.requestsCount}</h3>
                        </div>
                    </div>
                </div>

                {/* Funding Card */}
                <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow border-b-4 border-emerald-500 overflow-hidden">
                    <div className="card-body flex-row items-center gap-6 p-8">
                        <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500 text-4xl shadow-inner"><FaDonate /></div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Funding</p>
                            <h3 className="text-3xl font-black text-gray-800">${stats.totalFunding}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800">Growth Overview</h3>
                    <p className="text-sm text-gray-400">Activity comparison across all segments</p>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 600 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                            <Tooltip
                                cursor={{ fill: '#f9fafb' }}
                                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={70}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;