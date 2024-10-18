

//import React from 'react';
//import { useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
//import { Container, Typography, Button } from '@mui/material';
//import { RootState } from '../redux/types';

//const Dashboard: React.FC = () => {
//    const user = useSelector((state: RootState) => state.auth.user);
//    const { firstName = 'User', lastName = '' } = user || {};

//    return (
//        <Container maxWidth="md" style={{ marginTop: '50px' }}>
//            <Typography variant="h4" gutterBottom>
//                Hello, {firstName} {lastName}!
//            </Typography>
//            <Typography variant="subtitle1" gutterBottom>
//                Welcome to your dashboard.
//            </Typography>
//            <Button
//                variant="contained"
//                color="primary"
//                component={Link}
//                to="/register"
//                style={{ marginTop: '20px' }}
//            >
//                Register New User
//            </Button>
//        </Container>
//    );
//};

//export default Dashboard;
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { RootState } from '../redux/types';

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

   
    const username = user?.username || 'User';
    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Hello, {username}!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Welcome to your dashboard.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
                style={{ marginTop: '20px' }}
            >
                Register New User
            </Button>
        </Container>
    );
};

export default Dashboard;
