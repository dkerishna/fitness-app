import "bootstrap/dist/css/bootstrap.min.css";
// Import Bootstrap CSS so you can use Bootstrap classes for styling (like buttons, navbar, etc.)

import { BrowserRouter, Route, Routes, Outlet, useNavigate, Link } from "react-router-dom";
// Import React Router tools for setting up navigation/routes in your app

import { useDispatch } from "react-redux";
// Get the hook to dispatch Redux actions (to change app-wide state)

import { logout } from "./slices/authSlice";
// Import your logout action from Redux to handle logging out

import { Container, Nav, Navbar } from "react-bootstrap";
// Import Bootstrap components for layout and navigation UI

// Import your different components/pages
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";

// This is your app's main layout (navbar + content area)
function Layout() {
  const dispatch = useDispatch();
  // Get dispatch function so we can trigger actions to Redux

  const navigate = useNavigate();
  // Get navigate function to change pages programmatically

  const handleLogout = () => {
    dispatch(logout());
    // When logout is clicked, update Redux store (clear auth info)
    navigate("/", { replace: true });
    // After logout, go back to landing page
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        {/* Bootstrap navbar with light color */}
        <Container>
          {/* Container gives padding and centers content */}
          <Navbar.Brand as={Link} to="/home" className="fw-bold text-primary">
            {/* App logo/title, clicking it goes to /home */}
            <i className="bi bi-heart-pulse-fill me-2"></i>
            {/* Heart pulse icon (Bootstrap Icons) */}
            FitQuest Fitness App
          </Navbar.Brand>

          <Nav className="ms-auto">
            {/* Nav items aligned to the right */}
            <Nav.Link as={Link} to="/add" className="text-primary">
              {/* Link to add a workout */}
              <i className="bi bi-plus-circle"></i> Add Workout
            </Nav.Link>

            <Nav.Link onClick={handleLogout} className="text-danger">
              {/* Logout link triggers handleLogout */}
              <i className="bi bi-box-arrow-right"></i> Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
      {/* This is where the page content (Home, AddTodo, etc.) will be shown */}
    </>
  );
}

// This is the app's top-level component where you set up all routes
export default function App() {
  return (
    <BrowserRouter>
      {/* Enables routing in your app */}
      <Routes>
        {/* Set up all your app's routes */}
        <Route path="/" element={<LandingPage />} />
        {/* When URL is /, show LandingPage */}

        <Route path="/login" element={<Login />} />
        {/* When URL is /login, show Login */}

        {/* All routes below require auth because they're inside RequireAuth */}
        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route path="home" element={<Home />} />
          {/* Show Home component at /home */}

          <Route path="add" element={<AddTodo />} />
          {/* Show AddTodo component at /add */}

          <Route path="todo/:id" element={<EditTodo />} />
          {/* Show EditTodo component at /todo/some-id */}

          <Route path="*" element={<ErrorPage />} />
          {/* Catch-all for unmatched routes, shows ErrorPage */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
