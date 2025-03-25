import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = ({ theme }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include at least one letter, one number, and one special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );

      localStorage.setItem("authToken", response.data.token);
      navigate("/login");
      alert("Registration successful! Redirecting to login...");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error registering. Please try again.");
    }
  };

  return (
    <section className={`register-container ${theme}`}>
      <div className="card">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          {['firstName', 'lastName', 'username', 'email'].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;