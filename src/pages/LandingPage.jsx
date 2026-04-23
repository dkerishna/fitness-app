import { Container, Button } from "react-bootstrap";
// Import Bootstrap components: Container for layout, Button for styled buttons

import { useNavigate } from "react-router-dom";
// Import useNavigate hook to programmatically navigate between pages

// This is the LandingPage component
export default function LandingPage() {
    const navigate = useNavigate();
    // Create a navigate function we can call to change routes

    return (
        <div
            style={{
                backgroundImage: "url('/images/gym-background.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
            }}
        >
            <Container>
                <h1 className="fw-bold display-3">Welcome to FitQuest</h1>
                <p className="lead mb-4">
                    Your personal fitness companion to track, plan, and conquer your fitness goals.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate("/login")}
                    // When clicked, navigate to /login page
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                    </Button>

                    <Button
                        variant="secondary"
                        size="lg"
                        disabled
                    >
                        <i className="bi bi-person-plus me-2"></i>
                        Sign Up (Coming Soon)
                    </Button>
                </div>
            </Container>
        </div>
    );
}
