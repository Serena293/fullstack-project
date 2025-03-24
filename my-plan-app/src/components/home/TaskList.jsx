import React, { useEffect } from "react";
import TaskItem from "../sharedcomponents/TaskItem";

const TaskList = ({ tasks }) => {
  console.log("🔍 TaskList ricevuta tasks:", tasks); // Debug 1

  useEffect(() => {
    console.log("📌 useEffect: Tasks aggiornate in TaskList:", tasks);
  }, [tasks]);

  if (!tasks || tasks.length === 0) {
    console.log("⚠️ Nessuna task da mostrare!");
    return <p>Nessuna task disponibile.</p>;
  }

  return (
    <div className="task-list-container">
      <h3>Lista Task</h3>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.taskId} className="list-group-item">
            <TaskItem task={task} refreshTasks={() => console.log("🌀 Refresh task!")} variant="regular" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
