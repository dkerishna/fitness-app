import { configureStore } from "@reduxjs/toolkit";
// Import the function to create a Redux store easily

import authReducer from "./slices/authSlice";
// Import your authentication reducer (handles login/logout)

import todoReducer from "./slices/todoSlice";
// Import your todo reducer (handles adding, editing, deleting todos)

// Load saved authentication state from localStorage (if exists)
const savedAuth = JSON.parse(localStorage.getItem("auth")) || {
    isAuthenticated: false, // Default: not logged in
    user: null,             // No user info by default
};

// Load saved todos from localStorage (if exists)
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

// Set up the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer, // Manage auth state with authReducer
        todos: todoReducer, // Manage todos state with todoReducer
    },
    preloadedState: {
        auth: savedAuth, // Start with saved auth state (or default)
        todos: {
            todos: savedTodos, // Start with saved todos (or empty list)
        },
    },
});

// Whenever the store changes (e.g. login, add todo, delete todo)
store.subscribe(() => {
    const state = store.getState(); // Get current state
    // Save auth state to localStorage as JSON string
    localStorage.setItem("auth", JSON.stringify(state.auth));
    // Save todos list to localStorage as JSON string
    localStorage.setItem("todos", JSON.stringify(state.todos.todos));
});

// Export the store so it can be used in your app
export default store;
