import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LOGOUT } from '../redux/actions/actionTypes';
import { RootState } from '../redux/types';
import { FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const { firstName = 'User', lastName = '' } = user || {};
    const navbarRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        navigate('/login');
    };

    const closeNavbar = () => {
        if (navbarRef.current) {
            const navbar = navbarRef.current;
            if (navbar.classList.contains('show')) {
                navbar.classList.remove('show');
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
                closeNavbar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    HindujaTech
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav" ref={navbarRef}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/dashboard"
                                style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'black', // Change color based on active state
                                })}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/profile"
                                    style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'black', // Change color based on active state
                                    })}
                                >
                                    Profile
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    {user && (
                        <span className="navbar-text me-3 d-flex align-items-center">
                            <FaUserCircle style={{ marginRight: '5px', fontSize: '1.2rem' }} />
                            {firstName} {lastName}
                        </span>
                    )}
                    {user && (
                        <button
                            className="btn btn-danger d-lg-none"
                            onClick={handleLogout}
                            style={{
                                padding: '0.1rem 0.3rem',
                                fontSize: '0.7rem',
                                position: 'absolute',
                                right: '0',
                                bottom: '0',
                                margin: '5px',
                            }}
                        >
                            Logout
                        </button>
                    )}
                    {user && (
                        <button
                            className="btn btn-danger d-none d-lg-block"
                            onClick={handleLogout}
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: '1rem',
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
