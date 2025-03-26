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
  isUpdating 
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

  return (
    <div className={`task-item ${variant} ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h5 className={completed ? "completed-title" : ""}>{title}</h5>
      <p className={completed ? "completed-text" : ""}>{description}</p>
      {dueDate && <p className={`due-date ${completed ? "completed-text" : ""}`}>📅 {dueDate}</p>}

      <div className="task-actions">
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          <i className="bi bi-trash"></i>
        </button>

        <button 
          className={`btn btn-sm ${completed ? 'btn-success' : 'btn-outline-success'}`}
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

        <button className="btn btn-warning btn-sm" onClick={() => setShowModal(true)}>
          <i className="bi bi-pencil"></i>
        </button>
      </div>

      {/* Modale di modifica */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className={darkMode ? "dark-mode-modal" : "light-mode-modal"}>
        <Modal.Header closeButton className={darkMode ? "dark-mode-header" : ""}>
          <Modal.Title>Modifica Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? "dark-mode-body" : ""}>
          <input type="text" name="title" value={updatedTask.title} onChange={handleChange} className="form-control mb-2"/>
          <textarea name="description" value={updatedTask.description} onChange={handleChange} className="form-control mb-2"></textarea>
          <input type="date" name="dueDate" value={updatedTask.dueDate} onChange={handleChange} className="form-control mb-2"/>
        </Modal.Body>
        <Modal.Footer className={darkMode ? "dark-mode-footer" : ""}>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Annulla</button>
          <button className="btn btn-primary" onClick={handleEditSubmit}>Salva Modifiche</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskItem;
