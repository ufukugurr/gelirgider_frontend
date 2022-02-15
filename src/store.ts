import { configureStore } from '@reduxjs/toolkit'
import authReducer from './stores/authSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
    },
})