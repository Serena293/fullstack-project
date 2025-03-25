import React, { useEffect } from "react";
import TaskItem from "../sharedcomponents/TaskItem";

const TaskList = ({ tasks, refreshTasks, deleteTask, editTask }) => {
  // console.log(" TaskList ricevuta tasks:", tasks);

  useEffect(() => {
    console.log("📌 useEffect: Tasks aggiornate in TaskList:", tasks);
  }, [tasks]);

  if (!tasks || tasks.length === 0) {
    //  console.log(" Nessuna task da mostrare!");
    return <p>Nessuna task disponibile.</p>;
  }

  return (
    <div className="task-list-container">
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.taskId} className="list-group-item">
            <TaskItem
              task={task}
              refreshTasks={refreshTasks}
              variant="regular"
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
