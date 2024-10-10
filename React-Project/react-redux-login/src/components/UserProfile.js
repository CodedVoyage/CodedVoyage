import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const UserProfile = () => {
    const user = useSelector((state) => state.user) || {};
    const { firstName = 'User', lastName = '' } = user;
    
    console.log('User Data:', user);

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card text-center" style={{ width: '400px' }}>
                <div className="card-body">
                    <h1 className="card-title">Welcome!</h1>
                    <h2 className="card-subtitle mb-2 text-muted">{firstName} {lastName}</h2>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
