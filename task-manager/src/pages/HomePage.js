import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../taskSlice";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Task List</h1>
      <Link
        to="/add-task"
        style={{
          marginBottom: "20px",
          display: "inline-block",
          color: "#007bff",
          fontWeight: "bold",
        }}
      >
        Add New Task
      </Link>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: "15px",
              background: "#f9f9f9",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ color: "#333" }}>{task.title}</h2>
            <p>
              Status:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: task.completed ? "green" : "red",
                }}
              >
                {task.completed ? "Completed" : "Incomplete"}
              </span>
            </p>
            <Link
              to={`/edit-task/${task.id}`}
              style={{ color: "#007bff", fontWeight: "bold" }}
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
