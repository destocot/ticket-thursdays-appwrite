import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    authenticated: boolean,
    userId: string | null,
    userEmail: string | null,
    isAdmin: boolean

 }
const initialState: AuthState = {
    authenticated: false,
    userId: null,
    userEmail: null,
    isAdmin: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signin: (state, action) => {
            state.authenticated = true
            state.userId = action.payload.userId
            state.userEmail = action.payload.userEmail
        },
        signout: (state) => {
            state.authenticated = false
            state.userId = null
            state.userEmail = null
            state.isAdmin = false
        },
        grantAdminAccess: (state) => {
            state.isAdmin = true
        }
    }
});

export default authSlice.reducer;
export const { signin, signout, grantAdminAccess } = authSlice.actions;