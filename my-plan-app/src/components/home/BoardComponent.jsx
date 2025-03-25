import TaskItem from "../sharedcomponents/TaskItem.jsx";


const BoardComponent = ({ tasks, refreshTasks, deleteTask,editTask }) => {
  if (!tasks) return <p>⏳ Caricamento task...</p>;

  return (
    <div className="board-container">
      <div className="post-it-section">
        <h3>📝 Post-it</h3>
        <div className="post-it-grid">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.taskId}
                task={task}
                refreshTasks={refreshTasks}
                variant="post-it"
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ))
          ) : (
            <p>Nessun Post-it disponibile.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardComponent;
