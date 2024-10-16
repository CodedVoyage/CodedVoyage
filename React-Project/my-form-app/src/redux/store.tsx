import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '../redux/reducers/rootReducer'; 

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;

export default store;
