import { useState, useEffect } from "react";
import useAuth from "./useAuth";

  const useTasks = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Recupera le task quando cambia l'utente o viene richiesto un refresh
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!currentUser?.userId) return;

        const token = localStorage.getItem("authToken");
        const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

        const response = await fetch(`http://localhost:8080/api/tasks/user/${currentUser.userId}`, {
          method: "GET",
          headers: {
            Authorization: formattedToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);

        const data = await response.json();
        setTasks(data);
        setError(null);
      } catch (error) {
        console.error("Errore nel fetch delle task:", error);
        setError(error.message);
      }
    };

    fetchTasks();
  }, [currentUser, refresh]);


  const refreshTasks = () => setRefresh((prev) => !prev);

  
  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");
      const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: formattedToken,
          "Content-Type": "application/json"
         },
        
      });

      if (!response.ok) throw new Error("Errore nell'eliminazione della task");

     // console.log(`✅ Task ${taskId} eliminata con successo`);
      //setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
      refreshTasks();
    } catch (error) {
      console.error("Errore nella cancellazione della task:", error);
    }
  };

  // ✏️ Funzione per modificare una task
const editTask = async (taskId, updatedTask) => {
  console.log("📌 Task ID ricevuto:", taskId);
  console.log("📌 Updated Task ricevuta:", updatedTask);

  if (!updatedTask) {
    console.error("❌ Errore: updatedTask è undefined!");
    return;
  }
  try {
    const token = localStorage.getItem("authToken");
    const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: formattedToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
     
    });
 console.log(updatedTask)
    if (!response.ok) throw new Error("Errore nella modifica della task");

    refreshTasks(); 
  } catch (error) {
    console.error("Errore nella modifica della task:", error);
  }
};


  return { tasks, refreshTasks, deleteTask, editTask, error };
};

export default useTasks