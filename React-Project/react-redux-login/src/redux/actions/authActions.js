import { LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
                expiresInMins: 30,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                firstName: data.firstName, 
                lastName: data.lastName, 
            },
        });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        throw error; 
    }
};
