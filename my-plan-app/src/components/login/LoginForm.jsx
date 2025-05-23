// LoginForm component: A form for user authentication where users can log in using their username and password. 
// Upon successful login, the user is redirected to the home page, and authentication tokens are stored in local storage.

import React, { useState, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { DarkModeContext } from "../DarkModeContext";

const LoginForm = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
            const response = await axios.post("https://fullstack-project-70tb.onrender.com/api/auth/login", {
        username,
        password,
      });
   


      const token = response.data.token?.trim();
      localStorage.setItem("authToken", token);

      if (token) {
        try {
          const decoded = jwtDecode(token.replace("Bearer ", ""));
          if (decoded?.sub) {
            localStorage.setItem("userId", decoded.sub);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }

      navigate("/home");
    } catch (error) {
      setError("Invalid credentials or server error. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <section
      className={`d-flex justify-content-center align-items-center  w-100 ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="card p-4 login-card m-3">
        <h1 className="text-center mb-4">Login</h1>

        <form onSubmit={handleLogin}>
          <div >
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
        <div className="text-center mt-3">
          <p>
            <Link to="/forgotpassword">Forgot password?</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
