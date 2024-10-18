//import { Dispatch } from 'redux';
//import { LOGIN_SUCCESS, LOGIN_FAILURE, AuthActions } from './actionTypes';

//interface LoginSuccessAction {
//    type: typeof LOGIN_SUCCESS;
//    payload: {
//        id: number;
//        firstName: string;
//        lastName: string;
//        username: string;
//    };
//}

//interface LoginFailureAction {
//    type: typeof LOGIN_FAILURE;
//    payload: string;
//}

//export type AuthActions = LoginSuccessAction | LoginFailureAction;

//interface Credentials {
//    username: string;
//    password: string;
//}

//export const login = (credentials: Credentials) => async (dispatch: Dispatch<AuthActions>) => {
//    try {
//        const response = await fetch('https://dummyjson.com/auth/login', {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify({
//                username: credentials.username,
//                password: credentials.password,
//                expiresInMins: 30,
//            }),
//        });

//        if (!response.ok) {
//            throw new Error('Network response was not ok');
//        }

//        const data = await response.json();

//        dispatch({
//            type: LOGIN_SUCCESS,
//            payload: {
//                id: data.id,
//                firstName: data.firstName,
//                lastName: data.lastName,
//                username: data.username,
//            },
//        });
//    } catch (error) {
//        dispatch({
//            type: LOGIN_FAILURE,
//            payload: error.message,
//        });
//        throw error;
//    }
//};


import { Dispatch } from 'redux';
import { LOGIN_SUCCESS, LOGIN_FAILURE, AuthActions } from './actionTypes';

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: {
        id: string;
        username: string;
    };
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

export type AuthActions = LoginSuccessAction | LoginFailureAction;

interface Credentials {
    username: string;
    password: string;
}

export const login = (credentials: Credentials) => async (dispatch: Dispatch<AuthActions>) => {
    
};

