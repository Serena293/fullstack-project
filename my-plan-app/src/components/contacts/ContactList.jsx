import React from "react";
import ContactItem from "./ContactItem";
import {Link }from "react-router-dom"

const ContactList = ({ contacts, loading, error, onDelete }) => {
  return (
    <div className="container">
      <h2 className="my-4 text-center">Contact's list</h2>

      {loading && <p>Caricamento...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {contacts.length === 0 && !loading && (
        <p className="text-center">Nessun contatto trovato</p>
      )}

      <div className="list-group">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.username}
            contact={contact}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
