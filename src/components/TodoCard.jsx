// Import Button and Card components from react-bootstrap for UI
import { Button, Card } from "react-bootstrap";
// Import React hooks for managing state and lifecycle
import { useEffect, useState } from "react";
// Import useDispatch to dispatch actions to Redux
import { useDispatch } from "react-redux";
// Import the deleteTodo action creator from the slice
import { deleteTodo } from "../slices/todoSlice";

// The TodoCard component receives a todo object as a prop
export default function TodoCard({ todo }) {
    const dispatch = useDispatch(); // Hook to dispatch actions to Redux
    const [timer, setTimer] = useState(todo.duration * 60); // State for timer (in seconds)
    const [timerInterval, setTimerInterval] = useState(null); // State to store interval ID

    // Function to start the timer
    const startTimer = () => {
        if (!timerInterval) { // Only start if no interval is running
            const intervalID = setInterval(() => {
                setTimer(prev => { // Update timer every second
                    if (prev <= 1) { // When timer reaches 0 or below
                        clearInterval(intervalID); // Stop interval
                        setTimerInterval(null); // Reset interval ID
                        return 0; // Ensure timer doesn't go negative
                    }
                    return prev - 1; // Decrease timer by 1
                });
            }, 1000); // Run every 1000ms (1 sec)
            setTimerInterval(intervalID); // Save interval ID so we can stop it later
        }
    };

    // Function to pause the timer
    const pauseTimer = () => {
        clearInterval(timerInterval); // Stop the interval
        setTimerInterval(null); // Reset interval ID
    };

    // Function to reset the timer to its original value
    const resetTimer = () => {
        clearInterval(timerInterval); // Stop the interval
        setTimerInterval(null); // Reset interval ID
        setTimer(todo.duration * 60); // Reset timer to initial duration (in seconds)
    };

    // Function to dispatch delete action
    const handleDelete = () => {
        dispatch(deleteTodo(todo.id)); // Dispatch delete action with todo ID
    };

    // Cleanup interval when component unmounts or timerInterval changes
    useEffect(() => {
        return () => clearInterval(timerInterval); // Clear interval to avoid leaks
    }, [timerInterval]);

    return (
        <Card className={`my-3 rounded-3 ${todo.completed ? 'bg-success bg-opacity-25' : 'bg-danger bg-opacity-25'}`}>
            <Card.Header className={`fw-bold text-white ${todo.completed ? 'bg-success bg-opacity-75' : 'bg-danger bg-opacity-75'}`}>
                <div className="d-flex justify-content-between align-items-start">
                    {todo.completed ? "Completed" : "Not Completed"}
                    <div className="d-flex gap-2">
                        <Button
                            variant="secondary"
                            href={`todo/${todo.id}`}
                            size="sm"
                            style={{ width: "31px", height: "31px" }}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </Button>

                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            size="sm"
                            className="mb-1"
                            style={{ width: "31px", height: "31px" }}
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text>{todo.description}</Card.Text>

                <Card.Text><strong>Type:</strong> {todo.category}</Card.Text>
                <Card.Text><strong>Duration:</strong> {todo.duration} min</Card.Text>
                <Card.Text><strong>Date:</strong> {todo.date}</Card.Text>

                <p>
                    Timer: {Math.floor(timer / 60)}:
                    {(timer % 60).toString().padStart(2, '0')}
                </p>

                <div className="d-flex flex-wrap justify-content-between gap-2">
                    <Button onClick={startTimer}>
                        <i className="bi bi-play-fill flex-fill mx-4"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="ms-2">
                        <i className="bi bi-pause-fill flex-fill mx-4"></i>
                    </Button>
                    <Button onClick={resetTimer} className="ms-2">
                        <i className="bi bi-arrow-clockwise flex-fill mx-4"></i>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
