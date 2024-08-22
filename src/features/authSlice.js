import { createSlice } from "@reduxjs/toolkit";

// Initial state of the authentication slice
const initialState = {
  isAuthenticated: false, // Indicates whether the user is authenticated
  token: null, // Stores the authentication token
};

const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      state.isAuthenticated = true; // Set authentication status to true
      state.token = action.payload; // Store the authentication token
    },
    // Action to handle logout
    logout: (state) => {
      state.isAuthenticated = false; // Set authentication status to false
      state.token = null; // Clear the authentication token
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
