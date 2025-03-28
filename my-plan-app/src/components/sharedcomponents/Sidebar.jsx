//  A sidebar and opens on click that displays a list of tasks for the current user. 
// It fetches tasks using the `useTasks` hook and shows an error message if task loading fails or a loading message if tasks are still being fetched.

import React from "react";
import TaskList from "../home/TaskList";
import { useTasks } from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { currentUser } = useAuth();
  const { tasks, error } = useTasks(currentUser?.userId);

  // Display error message if task loading fails
  if (error) return <p>Error loading tasks: {error}</p>;

  // Display loading message while tasks are being fetched
  if (!tasks) return <p>Loading tasks...</p>;

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
