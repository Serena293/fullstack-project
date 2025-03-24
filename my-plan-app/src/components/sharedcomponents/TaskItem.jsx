import React from "react";

const TaskItem = ({ task, deleteTask, variant }) => {
  const { taskId, title, description, dueDate } = task;

  // const handleDelete = async () => {
  //   await fetch(`http://localhost:8080/api/tasks/${taskId}`, { method: "DELETE" });
  //   refreshTasks();
  // };

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
        <button className="btn btn-warning btn-sm">
          <i className="bi bi-pencil"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
