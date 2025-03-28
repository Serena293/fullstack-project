// HomePage: The main dashboard for users to manage tasks. 
// It includes a calendar, task creation form, board for Post-its, and a task list sidebar.

import React, { useState, useContext } from "react";
import CalendarComponent from "../sharedcomponents/CalendarComponet";
import CreateTasksForm from "./CreateTasksForms";
import BoardComponent from "./BoardComponent";
import TaskList from "./TaskList";
import CustomNavbar from "../sharedcomponents/CustomNavbar";
import Footer from "../sharedcomponents/Footer";
import useTasks from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";
import { DarkModeContext } from "../DarkModeContext";

const HomePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useAuth();
  const {
    tasks,
    error,
    refreshTasks,
    deleteTask,
    editTask,
    toggleTaskCompletion,
  } = useTasks(currentUser?.userId);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  if (error) {
    return <p className="text-danger">Error loading tasks: {error}</p>;
  }

  return (
    <div className={`d-flex flex-column min-vh-100 px-5 ${darkMode ? "dark-mode" : "light-mode"}`}>
      <section className="container-fluid h-100 mt-4 px-0">
        <CustomNavbar toggleSidebar={toggleSidebar} />

        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <CalendarComponent />
          </div>

          <div className="col-lg-6 col-md-12 mb-4">
            <CreateTasksForm refreshTasks={refreshTasks} />
          </div>
        </div>

        {/* Post-it Board Section */}
        <div className="mb-4">
          <BoardComponent
            tasks={tasks?.filter((task) => task.isItPostIt)}
            refreshTasks={refreshTasks}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        </div>

        {/* Sidebar for Task List */}
        {isSidebarVisible && (
          <div className={`task-list-sidebar ${darkMode ? "dark-mode" : ""} ${isSidebarVisible ? "show" : ""}`}>
            <div className="sidebar-header">
              <h2>Task List</h2>
              <button className="close-sidebar-btn" onClick={toggleSidebar}>✖</button>
            </div>
            <TaskList
              tasks={tasks}
              refreshTasks={refreshTasks}
              deleteTask={deleteTask}
              editTask={editTask}
              toggleTaskCompletion={toggleTaskCompletion} 
            />
          </div>
        )}

        <Footer />
      </section>
    </div>
  );
};

export default HomePage;
