import React from "react";
import TaskItem from "../sharedcomponents/TaskItem";
import useTasks from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";

const TaskList = () => {
  const { currentUser } = useAuth();
  const { tasks, deleteTask, editTask, toggleTaskCompletion, refreshTasks, loading, error } = useTasks(currentUser?.userId);

  // Debugging log
  console.log("📥 Tasks in TaskList:", tasks);

  if (loading) return <p>⏳ Loading tasks...</p>;
  if (error) return <p className="text-danger">❌ Error loading tasks: {error}</p>;

  return (
    <div className="task-list">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.taskId}
            task={task}
            refreshTasks={refreshTasks} // Ensuring consistency with BoardComponent
            deleteTask={deleteTask}
            editTask={editTask}
            toggleTaskCompletion={toggleTaskCompletion}
            variant="normal"
          />
        ))
      ) : (
        <p>📌 No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
