import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LOGOUT } from '../redux/actions/actionTypes';
import { RootState } from '../redux/types';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const { firstName = 'User', lastName = '' } = user || {};

    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    HindujaTech
                </Link>

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

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                        )}
                    </ul>
                    {user && (
                        <span className="navbar-text me-3">
                            {firstName} {lastName}
                        </span>
                    )}
                    {user && (
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
