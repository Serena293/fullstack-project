import React, { useState, useContext } from "react";
import CalendarComponent from "../sharedcomponents/CalendarComponet";
import CreateTasksForm from "./CreateTasksForms";
import BoardComponent from "./BoardComponent";
import TaskList from "./TaskList";
import CustomNavbar from "../sharedcomponents/CustomNavbar";
import Footer from "../sharedcomponents/Footer";
import useTasks from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";
import { DarkModeContext } from "../DarkModeContext"; // Importa il contesto

const HomePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { darkMode } = useContext(DarkModeContext); // Usa lo stato della dark mode

  const { currentUser } = useAuth();
  const { tasks, refreshTasks, error, deleteTask, editTask } = useTasks(
    currentUser?.userId
  );

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  if (error) return <p className="text-danger">Errore nel caricamento delle task: {error}</p>;

  return (
    <div className={`vh-100 px-5 ${darkMode ? "dark-mode" : "light-mode"}`}>
    <section lassName="container-fluid h-100 mt-4 px-0 ">
      <CustomNavbar toggleSidebar={toggleSidebar} />
     
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <CalendarComponent />
        </div>

        <div className="col-lg-6 col-md-12 mb-4">
          <CreateTasksForm refreshTasks={refreshTasks} />
        </div>
      </div>

      <div className="mb-4">
            <BoardComponent
          tasks={tasks?.filter((task) => task.isItPostIt)}
          refreshTasks={refreshTasks}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>

      {isSidebarVisible && (
        <div className="task-list-sidebar">
          <h2>Task List</h2>
          <TaskList
            tasks={tasks}
            refreshTasks={refreshTasks}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        </div>
      )}

      <Footer />
    </section>
    </div>
  );
};

export default HomePage;
