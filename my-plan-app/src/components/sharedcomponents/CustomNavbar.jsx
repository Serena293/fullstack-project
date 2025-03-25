import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeContext";

const CustomNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                Task List
              </a>
            </li>
            <li>
              <a className="nav-link" href="#" onClick={handleLogout}>
                Log out
              </a>
            </li>
            {/* Bottone Dark Mode */}
            <li className="nav-item">
              <button
                className="btn btn-outline-dark ms-2"
                onClick={toggleDarkMode}
              >
                <i className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`}></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
