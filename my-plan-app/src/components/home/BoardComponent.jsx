import { useTasks } from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";
import TaskItem from "../sharedcomponents/TaskItem";
import { useEffect } from "react";


const BoardComponent = () => {
  const { currentUser, loading: authLoading, error: authError } = useAuth();
  const { tasks, refreshTasks, error: tasksError } = useTasks(currentUser?.id);


  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  if (authLoading) return <p>🔄 Autenticazione in corso...</p>;
  if (authError) return <p>❌ Errore di autenticazione: {authError}</p>;
  if (!currentUser) return <p>⚠️ Utente non autenticato.</p>;
  if (tasksError)
    return <p>❌ Errore nel caricamento delle task: {tasksError}</p>;
  if (!tasks) return <p>⏳ Caricamento task...</p>;

  return (
    <div className="board-container">
      <div className="post-it-section">
        <h3>📝 Post-it</h3>
        <div className="post-it-grid">
          {console.log("tasks", tasks)}
          {tasks.filter((task) => task.isItPostIt).length > 0 ? (
            tasks
              .filter((task) => task.isItPostIt)
              .map((task) => (
                <TaskItem
                  key={task.taskId}
                  task={task}
                  refreshTasks={refreshTasks}
                  variant="post-it"
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
