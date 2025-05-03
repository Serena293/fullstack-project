import React, { useState, useEffect, useCallback, useContext } from "react";
import AddContactForm from "./AddContactForm";
import ContactList from "./ContactList";
import useAuth from "../../hooks/useAuth";
import { DarkModeContext } from "../DarkModeContext";
import CustomNavbar from "../sharedcomponents/CustomNavbar";
import Footer from "../sharedcomponents/Footer";

const ContactsComponent = () => {
  const { currentUser } = useAuth();
  const [contacts, setContacts] = useState([]); // Stato per contatti
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [error, setError] = useState(null); // Stato per errori
  const { darkMode } = useContext(DarkModeContext); // Stato per dark mode

  const refreshContacts = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://fullstack-project-70tb.onrender.com/api/users/${currentUser.userId}/contacts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Errore nel recupero contatti");
      const data = await response.json();

      console.log("Nuovi contatti ricevuti:", data);

      setContacts(data); // Imposta i contatti

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Chiamata iniziale al fetch dei contatti
  useEffect(() => {
    if (currentUser) {
      refreshContacts();
    }
  }, [currentUser, refreshContacts]);

  // Funzione per eliminare un contatto
  const handleContactDelete = (contact) => {
    // Aggiorna direttamente lo stato senza chiamare refreshContacts
    setContacts(contacts.filter((c) => c.username !== contact.username));
  };

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      <CustomNavbar />
      <div className="flex-grow-1">
        <h3 className="text-center">Add a new contact</h3>
        <p className="text-center">Look for other registered users</p>

        <div className="add-contact-form-container">
          <AddContactForm onContactAdded={refreshContacts} />
        </div>

        <div className="contact-list-container">
          <ContactList
            contacts={contacts} 
            loading={loading} 
            error={error}
            onDelete={handleContactDelete} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactsComponent;
