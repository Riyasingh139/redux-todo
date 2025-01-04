// File: src/pages/EditTaskPage.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../taskSlice";
import { useParams, useNavigate } from "react-router-dom";

function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === parseInt(id))
  );
  const [status, setStatus] = useState(task?.completed || false);

  if (!task)
    return (
      <p style={{ textAlign: "center", color: "#ff0000" }}>Task not found</p>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: task.id, status }));
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Edit Task</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "15px", color: "#333" }}>{task.title}</h2>
        <p style={{ marginBottom: "15px", color: "#666" }}>
          {task.description}
        </p>
        <label
          style={{
            display: "block",
            marginBottom: "15px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="true">Completed</option>
            <option value="false">Incomplete</option>
          </select>
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTaskPage;
