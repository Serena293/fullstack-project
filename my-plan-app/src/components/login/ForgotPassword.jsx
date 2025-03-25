import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword({ theme }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post("http://localhost:8080/api/password-reset/request", { email });
      if (response.status === 200) {
        setMessage({ type: "success", text: "Check your email for the reset link." });
      } else {
        setMessage({ type: "error", text: "Something went wrong. Try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Invalid email or server error." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`forgot-password-container ${theme}`}>
      <div className="card">
        <h1>Forgot Password</h1>
        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="extra-links">
          <p>Remembered your password? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </section>
  );
}