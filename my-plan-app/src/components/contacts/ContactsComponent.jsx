/**
 * ContactsComponent
 *
 * This component manages the user's contact list, allowing them to add new contacts
 * and view their existing ones. It fetches data from an API and updates dynamically.
 *
 * Features:
 * - Fetches and displays contacts.
 * - Allows users to add new contacts.
 * - Supports dark mode styling.
 */

import React, { useState, useEffect, useCallback, useContext } from "react";
import AddContactForm from "./AddContactForm";
import ContactList from "./ContactList";
import useAuth from "../../hooks/useAuth";
import { DarkModeContext } from "../DarkModeContext";
import CustomNavbar from "../sharedcomponents/CustomNavbar";
import Footer from "../sharedcomponents/Footer";

const ContactsComponent = () => {
  const { currentUser } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  // Fetch contacts from API
  const refreshContacts = useCallback(async () => {
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
  }, [currentUser]);

  // Fetch contacts on component mount
  useEffect(() => {
    if (currentUser) {
      refreshContacts();
    }
  }, [currentUser, refreshContacts]);

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <CustomNavbar />
      <div className="flex-grow-1">
        <div>
          <h3 className="text-center">Add a new contact</h3>
          <p className="text-center">Look for other registered users</p>
        </div>
        <div className="add-contact-form-container">
          <AddContactForm onContactAdded={refreshContacts} />
        </div>
        <div className="contact-list-container">
          <ContactList contacts={contacts} loading={loading} error={error} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactsComponent;
