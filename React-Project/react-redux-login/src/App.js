import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header'; 
import NotFound from './components/NotFound';

const LoginPage = lazy(() => import('./components/LoginPage'));
const UserProfile = lazy(() => import('./components/UserProfile'));

const PrivateRoute = ({ element }) => {
    const isAuthenticated = useSelector((state) => !!state.auth.user);
    return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
    const location = useLocation(); 

    return (
        <>
            
            {location.pathname !== '/login' && <Header />}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<PrivateRoute element={<UserProfile />} />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
};

const MainApp = () => (
    <Router>
        <App />
    </Router>
);

export default MainApp;
