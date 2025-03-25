import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Importa jwtDecode per decodificare il token

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

     // console.log("Risposta login:", response);

      // Salva il token rimosso il prefisso "Bearer "
      const token = response.data.token?.trim();
      localStorage.setItem("authToken", token);

      console.log("Token salvato:", token);

      // Decodifica il token per ottenere i dati dell'utente
      if (token) {
        try {
          const decoded = jwtDecode(token.replace("Bearer ", ""));
          console.log("Decoded Token:", decoded);

          // Se il token contiene l'ID utente, lo salviamo in localStorage
          if (decoded?.sub) {
            localStorage.setItem("userId", decoded.sub);
            console.log("User ID salvato:", decoded.sub);
          }
        } catch (error) {
          console.error("Errore nella decodifica del token:", error);
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
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center mb-4">Login</h1>

        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <div className="mb-3">
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

          {/* Password Input */}
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

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}

          {/* Submit Button */}
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
