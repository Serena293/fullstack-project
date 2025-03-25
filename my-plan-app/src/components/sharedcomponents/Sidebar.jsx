// Sidebar.js
import React from "react";
import TaskList from "../home/TaskList";
import { useTasks } from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { currentUser } = useAuth();
  const { tasks, error } = useTasks(currentUser?.userId);

  if (error) return <p>Errore nel caricamento delle task: {error}</p>;
  if (!tasks) return <p>Caricamento delle task in corso...</p>;

  return (
    <div
      className="sidebar"
      style={{
        width: "250px",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "#f8f9fa",
        height: "100vh",
        padding: "1rem",
        overflowY: "auto",
      }}
    >
      <TaskList tasks={tasks} /> 
    </div>
  );
};

export default Sidebar;
