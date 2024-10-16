import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/actionTypes';
import { AuthState } from '../types';

const initialState: AuthState = {
    user: null,
    error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    id: action.payload.id, 
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                },
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
