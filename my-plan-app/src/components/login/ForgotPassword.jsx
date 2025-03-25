import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
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
    <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center mb-4">Forgot Password</h1>

        {message && (
          <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} text-center`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter your email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>
            Remembered your password? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
