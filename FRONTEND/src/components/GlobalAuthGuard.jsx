import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GlobalAuthGuard = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-stone-50">
            <div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
        </div>
    );

    // Allow only the login page if not authenticated
    if (!user && location.pathname !== '/login') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default GlobalAuthGuard;
