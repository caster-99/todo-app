import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Custom hook to access the UserContext
import { FaSpinner } from 'react-icons/fa';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Access the current user and loading state

    if (loading) {
        // Show a loading spinner or placeholder while fetching user data
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <FaSpinner className="text-primary mb-3 spinner-border" size={40} />
                    <p className="fs-4">Loading user information</p>
                </div>
            </div>
        )
    }

    if (!user) {
        // Redirect to login if no user is logged in
        return <Navigate to="/login" />;
    }

    // Render the children (protected content) if authenticated
    return children;
};

export default ProtectedRoute;
