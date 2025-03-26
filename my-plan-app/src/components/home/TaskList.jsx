import TaskItem from "../sharedcomponents/TaskItem";
import React from "react";
import useTasks from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";

const TaskList = () => {
  const { currentUser } = useAuth();
  const { tasks, deleteTask, editTask, toggleTaskCompletion, refreshTasks, loading, error } = useTasks(currentUser?.userId);

  // 🔍 Log per debug
  console.log("📥 Task in TaskList:", tasks);

  if (loading) return <p>⏳ Caricamento in corso...</p>;
  if (error) return <p className="text-danger">❌ Errore nel caricamento delle task: {error}</p>;

  return (
    <div className="task-list">
      {tasks && tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task.taskId}
            task={task}
            refreshTasks={refreshTasks} // ✅ Aggiunto per coerenza con BoardComponent
            deleteTask={deleteTask}
            editTask={editTask}
            toggleTaskCompletion={toggleTaskCompletion} // ✅ Aggiunto
            variant="normal"
          />
        ))
      ) : (
        <p>📌 Nessuna task disponibile.</p>
      )}
    </div>
  );
};

export default TaskList;
