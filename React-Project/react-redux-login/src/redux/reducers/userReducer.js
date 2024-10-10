

import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes'; 

const initialState = {
    firstName: '',
    lastName: '',
    error: null, 
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
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
