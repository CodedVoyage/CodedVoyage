import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const NotFound = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card text-center" style={{ width: '400px' }}>
                <div className="card-body">
                    <h1 className="card-title">404 - Not Found</h1>
                    <p className="card-text">The page you are looking for does not exist.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
