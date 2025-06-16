import { useState } from "react";
// useState is used to manage form input and error states

import { Button, Container, Form, Card } from "react-bootstrap";
// Import Bootstrap components for layout and styling

import { useNavigate } from "react-router-dom";
// Hook to programmatically navigate to another route

import { useDispatch } from "react-redux";
// Hook to dispatch actions to the Redux store

import { login } from "../slices/authSlice";
// Import login action from authSlice

// The Login component
export default function Login() {
    const [username, setUsername] = useState("");
    // Track the username input

    const [password, setPassword] = useState("");
    // Track the password input

    const [errors, setErrors] = useState({});
    // Track validation errors

    const navigate = useNavigate();
    // Get navigate function to redirect

    const dispatch = useDispatch();
    // Get dispatch function to send actions

    function handleLogin() {
        const newErrors = {};
        // Start with empty error object

        // Validate username
        if (username === "") newErrors.username = "Email is required";

        // Validate password
        if (password === "") newErrors.password = "Password is required";

        // If there are validation errors, update state and stop
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Hardcoded credentials check
        const isCorrectUsername = username === "dineshkerishna@gmail.com";
        const isCorrectPassword = password === "password";

        if (isCorrectUsername && isCorrectPassword) {
            // If correct, dispatch login and navigate to /home
            dispatch(login("1234"));
            navigate("/home");
        } else {
            // If wrong, set general error
            setErrors({ general: "Invalid username or password" });
        }
    }

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Card className="p-4 bg-dark text-white shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <Card.Body>
                    <h1 className="text-center mb-4">Login to your FitQuest account</h1>

                    <Form>
                        {/* Email input */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                className="bg-light"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            // Update username when input changes
                            />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                            {/* Show error if exists */}
                        </Form.Group>

                        {/* Password input */}
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className="bg-light"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            // Update password when input changes
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                            {/* Show error if exists */}
                        </Form.Group>

                        {/* General login error */}
                        {errors.general && <div className="text-danger mb-3">{errors.general}</div>}

                        {/* Login button */}
                        <Button
                            variant="primary"
                            onClick={handleLogin}
                            className="w-100 mb-2"
                        >
                            Login
                        </Button>

                        {/* Go back button */}
                        <Button
                            variant="success"
                            onClick={() => navigate("/")}
                            className="w-100"
                        >
                            Go Back
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
