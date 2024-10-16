import './App.css';
import { Provider, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import store from './redux/store';
import LoginPage from './components/LoginPage';
import RegistrationPage from '../src/Form';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { RootState } from './redux/types';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return user ? children : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div className="App">
            {!isLoginPage && <Header />}
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
};

export default App;
