import React, { useState, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import ContactItem from "./ContactItem"; 
import { DarkModeContext } from "../DarkModeContext"; // Importa il contesto per dark mode

const ContactList = ({ onChat, refreshContacts }) => {
  const { currentUser } = useAuth();
  const { darkMode } = useContext(DarkModeContext); // Usa il contesto per ottenere la modalità
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!currentUser) return;
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `http://localhost:8080/api/users/${currentUser.userId}/contacts`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Errore nel recupero contatti");
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [currentUser, refreshContacts]); // Refresh dei contatti ogni volta che refreshContacts cambia

  const handleDelete = async (contact) => {
    if (!currentUser) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8080/api/users/${currentUser.userId}/contacts/${contact.username}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Errore nella rimozione del contatto");
      setContacts((prev) => prev.filter((c) => c.username !== contact.username));
      if (refreshContacts) refreshContacts(); // Ricarica la lista dei contatti dopo la rimozione
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h2 className="my-4 text-center">Contact's list</h2>
      {loading && <p>Caricamento...</p>}
      {error && <p className="text-danger">{error}</p>}
      {contacts.length === 0 && !loading && <p className="text-center">Nessun contatto trovato</p>}
      <div className="list-group">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.username}
            contact={contact}
            onDelete={handleDelete}
            onChat={onChat}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
