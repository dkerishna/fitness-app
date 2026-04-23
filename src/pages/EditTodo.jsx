import { useState, useEffect } from "react";
// useState: to store form data
// useEffect: to load existing todo data when the component loads

import { Button, Form, Container } from "react-bootstrap";
// Bootstrap components for form and button

import { useNavigate, useParams } from "react-router-dom";
// useNavigate: to redirect user
// useParams: to get URL parameter (the todo ID)

import { useSelector, useDispatch } from "react-redux";
// useSelector: to get todos from store
// useDispatch: to send actions to store

import { editTodo } from "../slices/todoSlice";
// Action creator to edit a todo

export default function EditTodo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    // Get the todo ID from URL
    const todoId = parseInt(id);
    // Convert ID from string to number

    const todos = useSelector((state) => state.todos.todos);
    // Get all todos from store
    const currentTodo = todos.find((todo) => todo.id === todoId);
    // Find the todo that matches the ID

    // States for form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (currentTodo) {
            // Fill form fields with existing todo data
            setTitle(currentTodo.title);
            setDescription(currentTodo.description);
            setCompleted(currentTodo.completed);
            setCategory(currentTodo.category);
            setDate(currentTodo.date);
            setTime(currentTodo.time);
            setDuration(currentTodo.duration);
        } else {
            // If no todo found, go back home
            navigate("/home");
        }
    }, [currentTodo, navigate]);

    function updateTodo(event) {
        event.preventDefault();
        // Prevent page reload on submit

        dispatch(editTodo({
            id: todoId,
            updatedTodo: {
                id: todoId,
                title,
                description,
                completed,
                category,
                date,
                time,
                duration: parseInt(duration)
            }
        }));

        navigate("/home");
        // Redirect to home page after update
    }

    if (!currentTodo) {
        return null;
        // Return nothing while redirecting
    }

    return (
        <Container className="py-4 d-flex justify-content-center">
            <div style={{ width: "100%", maxWidth: "800px" }}>
                <Form onSubmit={updateTodo}>
                    <h1 className="mb-4">Edit Fitness Task</h1>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Workout Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            type="text"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            as="textarea"
                            rows={3}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            required
                        >
                            <option value="">Select category</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Strength">Strength</option>
                            <option value="Flexibility">Flexibility</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={time}
                            onChange={(event) => setTime(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="duration">
                        <Form.Label>Duration (minutes)</Form.Label>
                        <Form.Control
                            type="number"
                            value={duration}
                            onChange={(event) => setDuration(event.target.value)}
                            min="1"
                            required
                        />
                    </Form.Group>

                    <Form.Check
                        type="checkbox"
                        id="completed"
                        label="Mark as completed"
                        checked={completed}
                        onChange={(event) => setCompleted(event.target.checked)}
                        className="mb-3"
                    />

                    <Button variant="primary" type="submit" className="mt-2">
                        Update
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
