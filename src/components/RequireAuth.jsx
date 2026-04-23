// Import useSelector to access Redux state
import { useSelector } from "react-redux";
// Import Navigate component to redirect users
import { Navigate } from "react-router-dom";

// RequireAuth component wraps around protected routes
export default function RequireAuth({ children }) {
    // Get the authentication token from Redux store
    const token = useSelector((state) => state.auth.token);

    // If token exists, render the children (protected content)
    // If no token, redirect to /login page
    return token ? children : <Navigate to="/" replace />;
}
