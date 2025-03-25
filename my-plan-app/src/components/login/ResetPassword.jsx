import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


const ResetPassword = ({ theme }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("Token non valido o mancante.");
    }
  }, [location.search]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/password-reset/reset",
        { token, password }
      );
      setMessage(response.data);
      setError("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("Errore durante il reset della password.");
      setMessage("");
    }
  };

  return (
    <section className={`reset-password-container ${theme}`}>
      <div className="card">
        <h2>Reset Password</h2>

        {message && <div className="message success">{message}</div>}
        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label>Nuova Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Conferma Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;