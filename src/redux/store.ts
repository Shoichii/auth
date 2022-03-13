import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice';
import { formSlice } from './formSlice';
// ...

export const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
        formSlice: formSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch