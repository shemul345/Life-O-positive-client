import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AdminHome from '../AdminHome/AdminHome';
import UserHome from '../UserHome/UserHome';

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // ইউজারের রোল ফেচ করা (যেহেতু useAdmin নেই)
    const { data: userData, isLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <span className="loading loading-dots loading-lg"></span>;

    // রোলের ওপর ভিত্তি করে কম্পোনেন্ট রিটার্ন
    return (
        <div>
            {userData?.role === 'admin' ? <AdminHome /> : <UserHome />}
        </div>
    );
};

export default DashboardHome;