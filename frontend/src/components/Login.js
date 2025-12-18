import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth(); // Access context functions
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; // Minimum password length
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous error messages
        if (!validateEmail(email)) {
            setFormErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
        }
        if (!validatePassword(password)) {
            setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters long.' }));
        }
        try {
            await login({ email, password }); // Call login from context
            navigate('/'); // Redirect on successful login
        } catch (err) {
            console.log('Login Error:', err);
            // Show a user-friendly error message based on the error
            if (err.message === 'User not found') {
                setError('User not found. Please check your email and try again.');
            } else {
                setError(err.message || 'An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="h-100 gradient-form">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-1 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6 bg-cream rounded-1">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <h4 className="mt-1 mb-5 pb-1">Hello!</h4>
                                        </div>

                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <form onSubmit={handleLogin}>
                                            <p>Please login to your account</p>

                                            {/* Email Field */}
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Email"
                                                    name="email"
                                                    className="form-control"
                                                    required
                                                />
                                                {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                                            </div>

                                            {/* Password Field */}
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Password"
                                                    name="password"
                                                    className="form-control"
                                                    required
                                                />
                                                {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
                                            </div>

                                            {/* Submit Button */}
                                            <div className="text-center pt-1 pb-1">
                                                <button
                                                    disabled={loading || !email || !password}
                                                    className="btn btn-primary btn-block"
                                                    type="submit"
                                                >
                                                    {loading ? 'Logging in...' : 'Log in'}
                                                </button>
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    disabled={loading || !email || !password}
                                                    className="btn btn-secondary"
                                                    type="button"
                                                    onClick={() => navigate('/register')}
                                                >
                                                    Create Account
                                                </button>
                                            </div>



                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center bg-gradient">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">
                                            Welcome to your notes app.
                                        </h4>
                                        <p className="small mb-0">
                                            This is a simple notes app that allows you to create, read, update, and delete notes.
                                            Made with love by <a href="https://luisalopezdev.onrender.com/" target='_blank'>Luisa Lopez</a>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
