// BoardComponent: A component that displays tasks as "post-its" on a board. 
// It allows for actions such as editing, deleting, and toggling task completion.

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
                toggleTaskCompletion={toggleTaskCompletion} 
              />
            ))
          ) : (
            <p>📌 No Post-its available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardComponent;
