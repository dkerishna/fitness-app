import { useSelector } from "react-redux";
// Import useSelector hook to get data from Redux store

import { Col, Container, Row } from "react-bootstrap";
// Import Bootstrap components for layout: Container, Row, and Col

import TodoCard from "../components/TodoCard";
// Import the TodoCard component (displays each workout)

// This is the Home page component
export default function Home() {
    // Get the list of todos from the Redux store
    const todos = useSelector((state) => state.todos?.todos || []);
    // state.todos?.todos means: safely access todos array inside state.todos
    // If not found, fallback to empty array []

    return (
        <Container>
            <h1 className="my-3">Your Workouts</h1>
            <Row>
                <CardGroup todos={todos} />
            </Row>
        </Container>
    );
}

// This helper component renders the todo cards
function CardGroup({ todos }) {
    return todos.map((todo) => (
        <Col md={4} key={todo.id}>
            {/* For each todo, create a Bootstrap column (takes 4/12 width on medium+ screens) */}
            <TodoCard todo={todo} />
            {/* Render the TodoCard for this todo */}
        </Col>
    ));
}
