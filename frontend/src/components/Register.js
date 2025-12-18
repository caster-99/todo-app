import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const { register } = useAuth(); // Access context functions
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({ name: '', email: '', password: '' });
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        console.log('Registering user with:', { name, email, password }); // Debugging log
        if (name.trim() === '') {
            setFormErrors((prev) => ({ ...prev, name: 'Name is required.' }));
        }
        if (!validateEmail(email)) {
            setFormErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
        }
        if (!validatePassword(password)) {
            setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters long.' }));
        }

        try {
            await register({ name, email, password }); // Call register from context
            navigate('/login'); // Redirect on successful registration
        } catch (error) {
            console.log('Registration Error:', error);
            // Show a user-friendly error message based on the error
            if (error.message.includes('User already exists')) {
                setError('A user with this email already exists. Please use a different email.');
            } else {
                setError(error.message || 'An unexpected error occurred. Please try again.');
            }

        }
    }

    return (
        <div className="h-100 gradient-form">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-1 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6 bg-cream rounded-1">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <a href="#"
                                            onClick={() => navigate(-1)}
                                        >
                                            Go back
                                        </a>
                                        <div className="text-center pt-1 pb-1">

                                        </div>
                                        <div className="text-center">
                                            <h4 className="mt-1 mb-5 pb-1">Create an Account</h4>
                                        </div>
                                        <form onSubmit={handleRegister}>
                                            {/* Name input */}
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            {/* Email input */}
                                            <div className="mb-2">
                                                <input
                                                    type="email"
                                                    required
                                                    className="form-control"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                                            </div>
                                            {/* Password input */}
                                            <div className="mb-2">
                                                <input
                                                    type="password"
                                                    required
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                {formErrors.password && <small className="text-danger">{formErrors.password}</small>}     </div>
                                            {/* Submit button */}
                                            <div className="text-center pt-1 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    type="submit"
                                                >
                                                    Register
                                                </button>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register;