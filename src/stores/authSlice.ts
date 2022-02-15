import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') ?? false,
    },
    reducers: {
        login: (state, action: any) => {
            localStorage.setItem('token', action.payload)
            state.token = action.payload
        },
        logout: (state) => {
            localStorage.removeItem('token')
            state.token = false
        },
    },
})


export const { login, logout } = authSlice.actions

export default authSlice.reducer