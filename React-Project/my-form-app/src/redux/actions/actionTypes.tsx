export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;
export const LOGOUT = 'LOGOUT' as const;

export type AuthActionType =
    | typeof LOGIN_SUCCESS
    | typeof LOGIN_FAILURE
    | typeof LOGOUT;
