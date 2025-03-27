import React, { useState } from "react";
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
    <form onSubmit={handleAddContact}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Inserisci username"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Aggiungendo..." : "Aggiungi Contatto"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddContactForm;