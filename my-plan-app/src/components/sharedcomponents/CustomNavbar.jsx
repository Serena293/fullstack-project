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
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                Task List
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/contacts">
                Contacts
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="moreDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="moreDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Log out
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary ms-2"
                onClick={toggleDarkMode}
              >
                <i
                  className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`}
                ></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
