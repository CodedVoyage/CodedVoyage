import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authActions';
import '../components/LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Username and Password are required');
            return;
        }

        const credentials = {
            username,
            password,
            expiresInMins: 30,
        };

        try {
            await dispatch(login(credentials));
            setError('');
            navigate('/profile');
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-stretch min-vh-100">
                <div className="col-md-6 d-none d-md-flex">
                    <img
                        src="https://via.placeholder.com/600x800" 
                        className="img-fluid"
                        alt="login illustration"
                        style={{
                            width: '100%', 
                            height: '100vh', 
                            objectFit: 'cover', 
                        }}
                    />
                </div>

                {/* Mobile view image at the top */}
                <div className="col-12 d-md-none mb-4">
                    <img
                        src="https://via.placeholder.com/600x800" 
                        className="img-fluid"
                        alt="login illustration"
                        style={{
                            width: '100%', 
                            height: '300px', 
                            objectFit: 'cover', 
                        }}
                    />
                </div>

                {/* Login Form container */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="p-4" style={{ width: '100%' }}>
                        <h6 className="text-start mb-1">Log in</h6>
                        <h3 className="text-start mb-4">Welcome!</h3>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    placeholder="Enter your username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label" style={{ color: '#fff' }}>Password</label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#000' }}
                                />
                                <FontAwesomeIcon
                                    icon={passwordVisible ? faEyeSlash : faEye}
                                    id="togglePassword"
                                    style={{
                                        right: '10px',
                                        top: '73%',
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        transform: 'translateY(-50%)',
                                        zIndex: 1,
                                    }}
                                    onClick={togglePassword}
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe" style={{ color: 'black' }}>
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-decoration-none" style={{ color: 'black' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-dark w-100"
                            >
                                Log in
                            </button>
                            {error && <p className="text-danger mt-3">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
