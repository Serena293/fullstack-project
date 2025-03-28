// TaskItem: A component that displays a task with options to edit, delete, and mark as complete. 
// It uses a modal for editing task details and updates the task list after any action.

import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { DarkModeContext } from "../DarkModeContext";

const TaskItem = ({
  task,
  deleteTask,
  editTask,
  toggleTaskCompletion,
  refreshTasks,
  variant,
  isUpdating,
}) => {
  const { taskId, title, description, dueDate, completed } = task;
  const { darkMode } = useContext(DarkModeContext);
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    editTask(taskId, updatedTask);
    refreshTasks();
    setShowModal(false);
  };

  const handleDelete = () => {
    deleteTask(taskId);
    refreshTasks();
  };

  const handleToggleComplete = () => {
    toggleTaskCompletion(taskId, completed);
  };

  // Function to format date in dd-mm-yyyy format
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      className={`task-item ${variant} ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      {dueDate && (
        <p
          className={`due-date ${completed ? "completed-text" : ""}`}
          style={{ textAlign: "left" }}
        >
          📅 {formatDate(dueDate)}
        </p>
      )}

      <h5 className={completed ? "completed-title" : ""}>{title}</h5>
      <p className={completed ? "completed-text" : ""}>{description}</p>

      <div
        className="task-actions"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          <i className="bi bi-trash"></i>
        </button>

        <button
          className={`btn btn-sm ${completed ? "btn-success" : "btn-outline-success"}`}
          onClick={handleToggleComplete}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <span className="spinner-border spinner-border-sm" />
          ) : completed ? (
            <i className="bi bi-check-circle-fill" />
          ) : (
            <i className="bi bi-check-circle" />
          )}
        </button>

        <button
          className="btn btn-warning btn-sm"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-pencil"></i>
        </button>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className={darkMode ? "dark-mode-modal" : "light-mode-modal"}
      >
        <Modal.Header closeButton className={darkMode ? "dark-mode-header" : ""}>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? "dark-mode-body" : ""}>
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            className="form-control mb-2"
          ></textarea>
          <input
            type="date"
            name="dueDate"
            value={updatedTask.dueDate}
            onChange={handleChange}
            className="form-control mb-2"
          />
        </Modal.Body>
        <Modal.Footer className={darkMode ? "dark-mode-footer" : ""}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleEditSubmit}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskItem;
