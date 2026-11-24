import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Or some loading spinner
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
