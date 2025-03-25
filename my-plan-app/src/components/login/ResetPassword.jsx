import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
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
        { token,  password }
      );

      setMessage(response.data)
      setError("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("Errore durante il reset della password.");
      setMessage("");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Reset Password</h2>

        {message && <p className="text-success text-center">{message}</p>}
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label className="form-label">Nuova Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Conferma Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
