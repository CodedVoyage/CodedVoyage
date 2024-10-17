import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes';
import { UserState } from '../types';

const initialState: UserState = {
    id: null,
    firstName: '',
    lastName: '',
    username: '',
    error: null,
};

const userReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                username: action.payload.username, 
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
