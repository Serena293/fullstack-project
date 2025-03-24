import React, { useState } from "react";
import CalendarComponent from "../sharedcomponents/CalendarComponet";
import CreateTasksForm from "./CreateTasksForms";
import BoardComponent from "./BoardComponent";
import TaskList from "./TaskList";
import CustomNavbar from "../sharedcomponents/CustomNavbar";
import Footer from "../sharedcomponents/Footer";
import { useTasks } from "../../hooks/useTasks"; 
import useAuth from "../../hooks/useAuth"; 
import TaskItem from "../sharedcomponents/TaskItem";  

const HomePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  
  // Recupera user e task
  const { currentUser } = useAuth();
  const { tasks, refreshTasks, error } = useTasks(currentUser?.userId);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  if (error) return <p>Errore nel caricamento delle task: {error}</p>;

  return (
    <section className="container mt-4">
      <CustomNavbar toggleSidebar={toggleSidebar} />
      <h1 className="text-center">Home Page</h1>

      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <CalendarComponent />
        </div>

        <div className="col-lg-6 col-md-12 mb-4">
          <CreateTasksForm refreshTasks={refreshTasks} />
        </div>
      </div>

      <div className="mb-4">
        <h2>Post-it</h2>
        <BoardComponent tasks={tasks?.filter((task) => task.isItPostIt)} />
      </div>

      {isSidebarVisible && (
        <div className="task-list-sidebar">
          <h2>Task List</h2>
          <TaskList tasks={tasks} />
        </div>
      )}

      <Footer />
    </section>
  );
};

export default HomePage;
