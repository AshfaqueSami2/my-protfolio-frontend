import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { baseApi } from './api/api';

export const store = configureStore({
  reducer: {
    // Add the authApi reducer
    [authApi.reducerPath]: authApi.reducer,
    
    // Add the baseApi reducer
    [baseApi.reducerPath]: baseApi.reducer,

    // Add other reducers here (e.g., auth, user, etc.)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, baseApi.middleware), // Combine both middlewares
});

// Define RootState and AppDispatch types based on your store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
