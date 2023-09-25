import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-provider';

export const ProtectedRoute = (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    const { authUser } = useAuth();

    return authUser != null ? children : <Navigate to={'/login'} />;
};
