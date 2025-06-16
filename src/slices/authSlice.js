// Import createSlice function from Redux Toolkit to simplify slice creation
import { createSlice } from "@reduxjs/toolkit";

// Create the auth slice of state
const authSlice = createSlice({
    name: "auth", // Name of the slice (used as part of action type)
    initialState: {
        token: null, // Initial state: no token (user is not logged in)
    },
    reducers: {
        // Reducer for logging in
        login: (state, action) => {
            // Set the token in state to the value passed in the action payload
            state.token = action.payload;
        },
        // Reducer for logging out
        logout: (state) => {
            // Clear the token (log out the user)
            state.token = null;
        },
    },
});

// Export the action creators (login, logout) for use in components
export const { login, logout } = authSlice.actions;

// Export the reducer function to be included in the Redux store
export default authSlice.reducer;
