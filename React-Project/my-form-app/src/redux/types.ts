// src/redux/types.ts
export interface AuthState {
    user: {
        firstName: string;
        lastName: string;
    } | null;
    error: string | null;
}

export interface UserState {
    firstName: string;
    lastName: string;
    error: string | null;
}

export interface RootState {
    auth: AuthState;
    user: UserState;
}
