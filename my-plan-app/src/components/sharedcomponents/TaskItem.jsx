import React, { useState } from "react";
import Modal from "react-bootstrap/Modal"; // Se usi Bootstrap, altrimenti crea un div normale

const TaskItem = ({ task, deleteTask, variant, editTask }) => {
  const { taskId, title, description, dueDate } = task;

  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    editTask(taskId, updatedTask);
    setShowModal(false); 
  };

  return (
    <div className={`task-item ${variant === "post-it" ? "post-it" : "normal-task"}`}>
      <h5>{title}</h5>
      <p>{description}</p>
      {dueDate && <p className="due-date">📅 {dueDate}</p>}

      <div className="task-actions">
        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(taskId)}>
          <i className="bi bi-trash"></i>
        </button>
        <button className="btn btn-success btn-sm">
          <i className="bi bi-check-circle"></i>
        </button>
        <button className="btn btn-warning btn-sm" onClick={() => setShowModal(true)}>
          <i className="bi bi-pencil"></i>
        </button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" name="title" value={updatedTask.title} onChange={handleChange} className="form-control mb-2"/>
          <textarea name="description" value={updatedTask.description} onChange={handleChange} className="form-control mb-2"></textarea>
          <input type="date" name="dueDate" value={updatedTask.dueDate} onChange={handleChange} className="form-control mb-2"/>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Annulla</button>
          <button className="btn btn-primary" onClick={handleEdit}>Salva Modifiche</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskItem;
