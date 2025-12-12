import { useAuth } from "../auth/authContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) return <Navigate to="/auth/login" replace />;

    if (!user.isAdmin) return <Navigate to={`/host/${user.id}`} replace />;

    return children;
}
