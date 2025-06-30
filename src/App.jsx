import React, { useState, useEffect } from "react"; //exporting function fronm react
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./AppStyles.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = () => {
  const [tasks, setTasks] = useState([]);

  async function fetchAllTasks() {
    try {
      const response = await axios.get(
        "https://client-side-routing-backend-eight.vercel.app/api/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const compltedTasks = () => {
    let newArr = [...tasks];
    newArr = newArr.filter((task) => task.completed === true);
    console.log(newArr);
    return newArr;
  };

  const notCompltedTask = () => {
    let newArr = [...tasks];
    newArr = newArr.filter((task) => !task.completed === true);
    console.log(newArr);
    return newArr;
  };

  return (
    <div>
      <NavBar />
      {/* <TaskList tasks={tasks} fetchAllTasks={fetchAllTasks} />
      <AddTask fetchAllTasks={fetchAllTasks} /> */}
      <Routes>
        <Route
          path="/"
          element={<TaskList tasks={tasks} fetchAllTasks={fetchAllTasks} />}
        />
        <Route
          path="/completed"
          element={
            <TaskList tasks={compltedTasks()} fetchAllTasks={fetchAllTasks} />
          }
        />

        <Route
          path="/incomplete"
          element={
            <TaskList tasks={notCompltedTask()} fetchAllTask={fetchAllTasks} />
          }
        />
        <Route
          path="/add-task"
          element={<AddTask fetchAllTask={fetchAllTasks} />}
        />
        {/* Currently, we don't have any routes defined. And you can see above that we're
            rendering the TaskList and AddTask components directly, no matter what our URL looks like.
            Let's fix that! */}
      </Routes>
    </div>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
