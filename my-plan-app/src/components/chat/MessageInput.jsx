import React, { useState } from "react";
import { Form, InputGroup, Button, Alert, Spinner } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import useAuth from "../../hooks/useAuth";

const MessageInput = ({ selectedChat, onMessageSent }) => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    setError(null);

    if (!message.trim()) {
      setError("Il messaggio non può essere vuoto");
      return;
    }

    if (!selectedChat || !currentUser) {
      setError("Seleziona un contatto per inviare il messaggio");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/messages/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          senderId: currentUser.userId,
          receiverUsername: selectedChat.username,
          content: message
        }),
      });

      // Prima di parsare la risposta, controlliamo se è vuota
      const responseText = await response.text();
      if (!responseText) {
        throw new Error("La risposta del server è vuota");
      }

      const sentMessage = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(sentMessage.message || "Errore nell'invio del messaggio");
      }

      setMessage("");
      if (onMessageSent) {
        onMessageSent(sentMessage);
      }
    } catch (error) {
      console.error("Errore nell'invio:", error);
      setError(error.message || "Si è verificato un errore durante l'invio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 border-top">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Form onSubmit={sendMessage}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Scrivi un messaggio..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Messaggio"
            disabled={loading}
          />
          <Button 
            type="submit" 
            variant="primary" 
            disabled={!message.trim() || loading}
            aria-label="Invia messaggio"
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <Send size={20} />
            )}
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageInput;