import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Updated import
import { Link } from "react-router-dom"; // Import Link component

const RegisterForm = () => {
  // State hooks for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Regex for password validation
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // Hook for redirection (using useNavigate instead of useHistory)
  const navigate = useNavigate(); // Updated to useNavigate

  // Set the Authorization header globally for Axios if a token is present in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//   }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password matches regex
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include at least one letter, one number, and one special character."
      );
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Prepare the data to be sent to the backend
    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    try {
      // Send POST request with Axios to the backend (updated to localhost:8080)
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        userData,
        // {
        //   withCredentials: true,
        // }
      );

      const token = response.data.token;

      // Store the JWT token in LocalStorage
      localStorage.setItem("authToken", token);

      // Log the token in the console
      console.log("Token in register form:", token);

      // Clear the form inputs
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");

      // Redirect to the login page using navigate (updated)
      navigate("/login"); 

      // Show a success message
      alert("Registration successful! Redirecting to login...");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error during registration:", error);
      alert("Error registering. Please try again.");
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center mb-4">Register</h1>

        <form onSubmit={handleSubmit}>
          {/* First Name Input */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Username Input */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>

        {/* Link to Login Form */}
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
