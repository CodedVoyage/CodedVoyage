import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LOGOUT } from '../redux/actions/actionTypes'; 

const Header = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                
                <a className="navbar-brand" href="#">
                    HindujaTech
                </a>

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
                            <a className="nav-link active" aria-current="page" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Settings
                            </a>
                        </li>
                    </ul>

                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
