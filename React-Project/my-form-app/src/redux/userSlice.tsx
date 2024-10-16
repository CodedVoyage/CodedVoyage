import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        accessToken: '',
        refreshToken: '',
        id: null,
        image: '',
    },
    reducers: {
        setUser(state, action) {
            const { firstName, lastName, email, accessToken, refreshToken, id, image } = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.id = id;
            state.image = image;
        },
        logout(state) {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.accessToken = '';
            state.refreshToken = '';
            state.id = null;
            state.image = '';
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
