import { useAuth } from "../auth/authContext";
import { Navigate, useParams } from "react-router-dom";

export default function HostRoute({ children }) {

    const { user, loading } = useAuth();
    const { hostId } = useParams();

    if (loading) return null;

    if (!user) return <Navigate to="/auth/login" replace />;

    if (user.isAdmin) return children;

    if (String(user.id) !== String(hostId)) return <Navigate to={`/host/${user.id}`} replace />;

    return children;
}
