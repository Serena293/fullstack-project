import React from "react";
import { Button, Card } from "react-bootstrap";

const ContactItem = ({ contact, onDelete, onChat }) => {
  return (
    <Card className="mb-3">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <span className="fw-bold">{contact.username}</span>
        <div>
          {/* Chat button */}
          <Button
            variant="primary"
            size="sm"
            className="me-2"
            onClick={() => onChat(contact)}
            aria-label={`Chat with ${contact.username}`}
          >
            💬
          </Button>
          {/* Delete button */}
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(contact)}
            aria-label={`Remove ${contact.username} from contacts`}
          >
            ❌
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ContactItem;
