import React, { createContext, useState, useEffect } from 'react';

import * as api from '../api/api'; // Import all functions from api file

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        //console.log(savedUser);
        return savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    }); // Initialize user state with localStorage value if available
    const [token, setToken] = useState(localStorage.getItem('token') || null); // JWT token
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Login function
    const login = async (credentials) => {
        setLoading(true);
        setError(''); // Clear any existing error messages

        try {
            const { user, token } = await api.login(credentials); // API call
            setUser(user); // Save user data
            setToken(token); // Save token
            localStorage.setItem('token', token); // Persist token
            localStorage.setItem('user', JSON.stringify(user)); // Persist user
            api.setAuthToken(token); // Set token in headers for API
        } catch (err) {
            console.error('Login Error:', err.message); // Log error for debugging
            setError(err.message || 'Login failed'); // Set error state for the component
            throw err; // Propagate error for further handling if needed
        } finally {
            setLoading(false); // Reset loading state
        }
    };


    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('user'); // Remove user
        api.removeAuthToken(); // Clear headers
    };

    // Fetch user data (for token persistence)
    const fetchUser = async () => {
        setLoading(true);
        try {
            const data = await api.getUser(); // Fetch user from API
            setUser(data); // Update user
            localStorage.setItem('user', JSON.stringify(data)); // Persist user data
        } catch (err) {
            logout(); // Invalid token
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            api.setAuthToken(token); // Set token in API headers
            fetchUser(); // Fetch user on load
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, token, loading, error, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
