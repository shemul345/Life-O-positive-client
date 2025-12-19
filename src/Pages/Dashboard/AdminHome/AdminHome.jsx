import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers, FaHandHoldingHeart, FaDonate } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const colors = ['#EF4444', '#F97316', '#10B981', '#3B82F6', '#8B5CF6'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-back'
        });
    }, []);

    const { data: stats = { donorsCount: 0, requestsCount: 0, totalFunding: 0 }, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const chartData = [
        { name: 'Donors', count: stats.donorsCount },
        { name: 'Requests', count: stats.requestsCount },
        { name: 'Funding', count: stats.totalFunding },
    ];

    if (isLoading) return (
        <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
            <span className="loading loading-spinner loading-lg text-error"></span>
            <p className="text-gray-500 font-bold animate-pulse">Loading Analytics...</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-aos="fade-down">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                        Welcome Back, <span className="text-red-600 underline decoration-red-100">{user?.displayName || 'Admin'}</span>! 👋
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">Here's what's happening with Life O+ today.</p>
                </div>
                <div className="px-6 py-2 bg-neutral-900 text-white rounded-full text-xs font-black tracking-[0.2em] shadow-lg">
                    ADMIN DASHBOARD
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Total Donors Card */}
                <div
                    className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="p-8 flex items-center gap-6">
                        <div className="p-5 bg-red-50 rounded-2xl text-red-500 text-4xl group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                            <FaUsers />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Donors</p>
                            <h3 className="text-4xl font-black text-gray-800 mt-1">{stats.donorsCount}</h3>
                        </div>
                    </div>
                    <div className="h-2 bg-red-500 w-0 group-hover:w-full transition-all duration-700"></div>
                </div>

                {/* Requests Card */}
                <div
                    className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div className="p-8 flex items-center gap-6">
                        <div className="p-5 bg-orange-50 rounded-2xl text-orange-500 text-4xl group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                            <FaHandHoldingHeart />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Requests</p>
                            <h3 className="text-4xl font-black text-gray-800 mt-1">{stats.requestsCount}</h3>
                        </div>
                    </div>
                    <div className="h-2 bg-orange-500 w-0 group-hover:w-full transition-all duration-700"></div>
                </div>

                {/* Funding Card */}
                <div
                    className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <div className="p-8 flex items-center gap-6">
                        <div className="p-5 bg-emerald-50 rounded-2xl text-emerald-500 text-4xl group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                            <FaDonate />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Funding</p>
                            <h3 className="text-4xl font-black text-gray-800 mt-1">${stats.totalFunding}</h3>
                        </div>
                    </div>
                    <div className="h-2 bg-emerald-500 w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
            </div>

            {/* Chart Section */}
            <div
                className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay="400"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h3 className="text-2xl font-black text-gray-800">Platform Overview</h3>
                        <p className="text-sm text-gray-400 font-medium">Growth comparison across key metrics</p>
                    </div>
                    <div className="flex gap-2">
                        {colors.slice(0, 3).map((color, i) => (
                            <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                        ))}
                    </div>
                </div>

                <div className="h-[450px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontWeight: 700, fontSize: 14 }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: '#f9fafb' }}
                                contentStyle={{
                                    borderRadius: '20px',
                                    border: 'none',
                                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                    padding: '15px'
                                }}
                            />
                            <Bar
                                dataKey="count"
                                shape={<TriangleBar />}
                                label={{ position: 'top', fill: '#1f2937', fontWeight: 900, fontSize: 16 }}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                    />
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