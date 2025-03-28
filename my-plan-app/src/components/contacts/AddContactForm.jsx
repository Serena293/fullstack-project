import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa"; 
import useAuth from "../../hooks/useAuth";

const AddContactForm = ({ onContactAdded }) => {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8080/api/users/${currentUser.userId}/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }),
        }
      );

      console.log("Status:", response.status);
      const result = await response.text();

      if (!response.ok) {
        throw new Error(result);
      }

      setUsername("");
      if (onContactAdded) onContactAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleAddContact} 
      className="d-flex flex-column gap-3" 
      style={{ width: "300px", margin: "auto" }}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search username"
        required
        className="form-control"
      />
      <button 
        type="submit" 
        disabled={loading} 
        className={`btn btn-primary d-flex align-items-center justify-content-center ${loading ? "disabled" : ""}`}
      >
        <FaUserPlus className="me-2" />
        {loading ? "Adding contact..." : "Add Contact"}
      </button>
      {error && <p className="text-danger">{error}</p>}
    </form>
  );
};

export default AddContactForm;
