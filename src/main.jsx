import React from "react";
// Import React to use JSX and React features

import ReactDOM from "react-dom/client";
// Import ReactDOM for rendering the React app into the DOM

import App from "./App";
// Import your main App component

import { Provider } from "react-redux";
// Import Provider so we can connect Redux store to React components

import store from "./store";
// Import the Redux store we configured

// Create the root element where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
root.render(
    <Provider store={store}>
        {/* Wrap App with Provider so all components can access Redux store */}
        <App />
    </Provider>
);
