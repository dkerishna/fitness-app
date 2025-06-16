// Import createSlice from Redux Toolkit to create the slice easily
import { createSlice } from "@reduxjs/toolkit";

// Create the todo slice of the Redux store
const todoSlice = createSlice({
    name: "todos", // Name of the slice (used in action types)
    initialState: {
        todos: [], // Initial state: an empty array of todos
    },
    reducers: {
        // Reducer to add a new todo item
        addTodo: (state, action) => {
            // Push the new todo (from action.payload) into the todos array
            state.todos.push(action.payload);
        },
        // Reducer to edit an existing todo
        editTodo: (state, action) => {
            // Destructure id and updatedTodo from the action payload
            const { id, updatedTodo } = action.payload;
            // Find index of the todo with matching id
            const index = state.todos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                // Replace the old todo with the updated one
                state.todos[index] = updatedTodo;
            }
        },
        // Reducer to delete a todo
        deleteTodo: (state, action) => {
            // Remove the todo whose id matches action.payload
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
    },
});

// Export the action creators (for components to dispatch)
export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;

// Export the reducer to include it in the store
export default todoSlice.reducer;
