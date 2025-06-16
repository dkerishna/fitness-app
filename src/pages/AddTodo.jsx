import { useState } from "react";
// Import useState hook to manage form input states

import { useNavigate } from "react-router-dom";
// Import useNavigate to programmatically navigate after adding todo

import { Container, Button, Form } from "react-bootstrap";
// Import Bootstrap components for UI

import { useDispatch } from "react-redux";
// Import useDispatch to dispatch actions to the Redux store

import { addTodo } from "../slices/todoSlice";
// Import the action creator to add a todo

export default function AddTodo() {
    // State for each form field
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");

    const dispatch = useDispatch();
    // Get the dispatch function so we can send actions

    const navigate = useNavigate();
    // Get navigate function to redirect after submitting

    function handleAddTodo(event) {
        event.preventDefault();
        // Prevent the form from refreshing the page

        dispatch(
            addTodo({
                id: Date.now(),
                // Unique ID based on current time
                title,
                description,
                completed,
                category,
                date,
                time,
                duration: parseInt(duration),
                // Convert duration to number
            })
        );

        navigate("/home");
        // Redirect to home page after adding
    }

    return (
        <Container className="mt-4" style={{ maxWidth: "800px" }}>
            <Form onSubmit={handleAddTodo}>
                {/* TITLE INPUT */}
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Workout Title</Form.Label>
                    <Form.Control
                        value={title}
                        // Show current value of title state in the input
                        onChange={(event) => setTitle(event.target.value)}
                        // Update the title state whenever user types
                        type="text"
                        placeholder="E.g. Morning Run"
                        required
                    />
                </Form.Group>

                {/* DESCRIPTION INPUT */}
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        // Update description state as user types
                        as="textarea"
                        rows={3}
                        placeholder="E.g. Run 5km in the park"
                        required
                    />
                </Form.Group>

                {/* CATEGORY SELECT */}
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        // Update category state when user picks an option
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Strength">Strength</option>
                        <option value="Flexibility">Flexibility</option>
                    </Form.Select>
                </Form.Group>

                {/* DATE INPUT */}
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        // Update date state when user picks a date
                        required
                    />
                </Form.Group>

                {/* TIME INPUT */}
                <Form.Group className="mb-3" controlId="time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                        // Update time state when user picks a time
                        required
                    />
                </Form.Group>

                {/* DURATION INPUT */}
                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                        // Update duration state as user types number
                        min="1"
                        required
                    />
                </Form.Group>

                {/* COMPLETED CHECKBOX */}
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(event) => setCompleted(event.target.checked)}
                    // Update completed state when user ticks/unticks
                    className="mb-3"
                />

                {/* SUBMIT BUTTON */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
