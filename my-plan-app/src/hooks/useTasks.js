import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

const useTasks = (userId) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Funzione per ottenere il token
  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token ? `Bearer ${token.replace('Bearer ', '')}` : null;
  };

  // Fetch delle task
  const fetchTasks = useCallback(async () => {
    if (!userId) return;
    const token = getAuthToken();
    if (!token) {
      setError("Utente non autenticato.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(API_URL, { headers: { Authorization: token } });
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Errore nel recupero delle task.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Eliminazione task
  const deleteTask = useCallback(async (taskId) => {
    const token = getAuthToken();
    if (!token) return;
    try {
      await axios.delete(`${API_URL}/${taskId}`, { headers: { Authorization: token } });
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Errore nell'eliminazione della task.");
    }
  }, [fetchTasks]);

  // Modifica task
  const editTask = useCallback(async (taskId, updatedTask) => {
    const token = getAuthToken();
    if (!token) return;
    try {
      await axios.put(`${API_URL}/${taskId}`, updatedTask, { headers: { Authorization: token } });
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Errore nella modifica della task.");
    }
  }, [fetchTasks]);

  // Toggle completamento task (optimistic update)
  // const toggleTaskCompletion = useCallback(async (taskId, completed) => {
  //   console.log(`🔄 Toggle completamento: Task ${taskId} -> ${completed}`);
  
  //   try {
  //     setTasks(prev => prev.map(task => 
  //       task.taskId === taskId ? { ...task, completed } : task
  //     ));
  
  //     const token = getAuthToken();
  //     console.log("📡 Inviando PATCH a:", `${API_URL}/${taskId}/completion`);
  //     console.log("📤 Headers:", { Authorization: token });
  //     console.log("📤 Params:", { completed });
  
  //     const response = await axios.patch(
  //       `${API_URL}/${taskId}/completion`,
  //       { completed },  // 👈 Passiamo il dato nel body
  //       {
  //         headers: { Authorization: token }
  //       }
  //     );
      
  
  //     console.log("✅ Risposta dal server:", response.data);
  //    fetchTasks(); // Ricarica le task dopo il completamento
  //   } catch (err) {
  //     console.error("❌ Errore nella richiesta PATCH:", err);
  //     setTasks(prev => prev.map(task => 
  //       task.taskId === taskId ? { ...task, completed: !completed } : task
  //     ));
  //     setError(err.response?.data?.message || "Errore nel completamento della task.");
  //   }
  // }, [fetchTasks]);

  const toggleTaskCompletion = useCallback(async (taskId, currentCompleted) => {
    const newCompleted = !currentCompleted; // Inverti lo stato localmente
    
    try {
          setTasks(prev => prev.map(task => 
        task.taskId === taskId ? { ...task, completed: newCompleted } : task
      ));
  
      const token = getAuthToken();
      if (!token) return;
  
      await axios.patch(
        `${API_URL}/${taskId}/completion`,
        { completed: newCompleted }, // Passa il nuovo stato
        { headers: { Authorization: token } }
      );
  
    
    } catch (err) {
      // Revert in caso di errore
      setTasks(prev => prev.map(task => 
        task.taskId === taskId ? { ...task, completed: currentCompleted } : task
      ));
      setError(err.response?.data?.message || "Errore nel completamento della task.");
    }
  }, []); 
  

  // Reset dell'errore dopo 5 secondi
  // useEffect(() => {
  //   if (error) {
  //     const timer = setTimeout(() => setError(null), 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [error]);

  // Fetch delle task quando cambia l'utente
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, userId]);

  return {
    tasks,
    loading,
    error,
    refreshTasks: fetchTasks, // Permette a HomePage di aggiornare le task
    deleteTask,
    editTask,
    toggleTaskCompletion
  };
};

export default useTasks;
