import TaskItem from "../sharedcomponents/TaskItem.jsx";

const BoardComponent = ({ tasks, refreshTasks, deleteTask, editTask, toggleTaskCompletion }) => {
  return (
    <div className="board-container">
      <div className="post-it-section">
        <div className="post-it-grid">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.taskId}
                task={task}
                refreshTasks={refreshTasks}
                variant="post-it"
                deleteTask={deleteTask}
                editTask={editTask}
                toggleTaskCompletion={toggleTaskCompletion} // ✅ Aggiunto
              />
            ))
          ) : (
            <p>📌 Nessun Post-it disponibile.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardComponent;
