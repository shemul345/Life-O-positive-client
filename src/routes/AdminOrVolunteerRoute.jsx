import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminOrVolunteerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const roleData = useRole();
    const location = useLocation();

    if (!Array.isArray(roleData)) {
        console.error("useRole is not returning an array!", roleData);
        return null;
    }

    const [role, roleLoading] = roleData;

    if (loading || roleLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (user && (role === 'admin' || role === 'volunteer')) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminOrVolunteerRoute;