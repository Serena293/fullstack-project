import React, { useState } from "react";
import axios from "axios";
import { format, parseISO, isValid } from "date-fns";

const CreateTasksForm = ({ refreshTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    isItPostIt: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      let formattedDueDate = null;
      if (taskData.dueDate) {
        const parsedDate = parseISO(taskData.dueDate);
        if (isValid(parsedDate)) {
          formattedDueDate = format(parsedDate, "yyyy-MM-dd");
        } else {
          console.error("Invalid date selected:", taskData.dueDate);
          throw new Error("Invalid date format");
        }
      }

      const taskPayload = {
        ...taskData,
        dueDate: formattedDueDate,
      };

      console.log("Sending task to server:", taskPayload);

      await axios.post("http://localhost:8080/api/tasks", taskPayload, {
        headers: {
          Authorization: formattedToken,
          "Content-Type": "application/json",
        },
      });

      console.log("Task created successfully!");

      // Aggiorna le task chiamando refreshTasks() invece di usare setTasks
      refreshTasks();

      // Resetta il form
      setTaskData({ title: "", description: "", dueDate: "", isItPostIt: false });
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  return (
    <section className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Add a New Task</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">What's the task?</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task name"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Details:</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter details..."
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">When is it due?</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="postItCheck"
              name="isItPostIt"
              checked={taskData.isItPostIt}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="postItCheck">
              Do you want to create a Post-it?
            </label>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateTasksForm;
