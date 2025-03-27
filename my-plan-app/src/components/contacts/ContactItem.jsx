import React from "react";
import { Button, Card } from "react-bootstrap"; // Importa i componenti di Bootstrap

const ContactItem = ({ contact, onDelete, onChat }) => {
  return (
    <Card className="mb-3">
      <Card.Body
        className="d-flex justify-content-between align-items-center"
      >
        <span>{contact.username}</span>
        <div>
          {/* Pulsante per la chat */}
          <Button
            variant="primary"
            size="sm"
            className="me-2"
            onClick={() => onChat(contact)}
          >
            💬
          </Button>
          {/* Pulsante per la rimozione */}
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(contact)}
          >
            ❌
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ContactItem;
