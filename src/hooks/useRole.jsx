import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data } = useQuery({
        
        enabled: !loading && !!user?.email,
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data; 
        }
    });
    return [data?.role || 'donor', roleLoading];
};

export default useRole;