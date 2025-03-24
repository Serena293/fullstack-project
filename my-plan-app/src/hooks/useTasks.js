import { useState, useEffect } from "react";
import useAuth from "./useAuth";

export const useTasks = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!currentUser?.userId) {
          throw new Error("Tentativo di fetch delle task senza userId!");
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Token di autenticazione mancante!");
        }
        const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

        console.log("Fetching tasks for user ID:", currentUser.userId);
        console.log("Using token:", formattedToken);

        const response = await fetch(`http://localhost:8080/api/tasks/user/${currentUser.userId}`, {
          method: "GET",
          headers: {
            Authorization: formattedToken,
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Tasks fetched:", data);

        setTasks(data);
        setError(null);
      } catch (error) {
        console.error("Errore nel fetch delle task:", error);
        setError(error.message);
      }
    };

    if (currentUser?.userId) {
      fetchTasks();
    }
  }, [currentUser, refresh]);

  const refreshTasks = () => setRefresh((prev) => !prev);

  return { tasks, refreshTasks, error };
};
