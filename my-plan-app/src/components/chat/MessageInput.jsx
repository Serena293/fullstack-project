/**
 * MessageInput Component
 * 
 * A text input form for sending messages. It allows the user to write a message 
 * and send it to the selected contact. It handles error messages, loading state, 
 * and ensures that the message is not empty before sending.
 */

import React, { useState, useContext } from "react";
import { Form, InputGroup, Button, Alert, Spinner } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { DarkModeContext } from "../DarkModeContext"; 
import useAuth from "../../hooks/useAuth";

const MessageInput = ({ selectedChat, onMessageSent }) => {
  const { currentUser } = useAuth();
  const { darkMode } = useContext(DarkModeContext); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    setError(null);

    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    if (!selectedChat || !currentUser) {
      setError("Select a contact to send a message");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://fullstack-project-70tb.onrender.com/api/messages/send", {
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

      const responseText = await response.text();
      if (!responseText) {
        throw new Error("The server response is empty");
      }

      const sentMessage = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(sentMessage.message || "Error sending message");
      }

      setMessage("");
      if (onMessageSent) {
        onMessageSent(sentMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error.message || "An error occurred while sending the message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-2 border-top ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Form onSubmit={sendMessage}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Message"
            disabled={loading}
            className={darkMode ? "bg-dark text-white border-0" : "bg-light text-dark"}
          />
          <Button
            type="submit"
            variant={darkMode ? "secondary" : "primary"} 
            disabled={!message.trim() || loading}
            aria-label="Send message"
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
