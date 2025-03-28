/**
 * ChatWindow Component
 * 
 * Displays the chat window for the selected contact. Fetches and displays messages 
 * for the selected chat and allows the user to send new messages. Messages are 
 * updated every 5 seconds via polling.
 */

import React, { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import MessageInput from "./MessageInput";

const ChatWindow = ({ selectedChat, darkMode }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || !selectedChat) {
        console.log("User or selectedChat is undefined");
        return;
      }

      console.log("Fetching messages for:", selectedChat);
      try {
        const response = await fetch(
          `http://localhost:8080/api/messages/chat?userId=${currentUser.userId}&username=${selectedChat.username}`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching messages");
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChat) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // Polling every 5s
      return () => clearInterval(interval);
    }
  }, [selectedChat, currentUser]);

  return (
    <div className={`p-3 d-flex flex-column ${darkMode ? "dark-mode" : "light-mode"}`} style={{ height: "100vh" }}>
      <h5 className={`text-center p-2 ${darkMode ? "bg-dark navbar-dark text-white" : "bg-light text-dark"}`}>
        Chat with {selectedChat ? `${selectedChat.firstName} ${selectedChat.lastName}` : "Select a contact"}
      </h5>
      <div className="flex-grow-1 overflow-auto">
        {loading ? (
          <div className="text-center p-3">
            <Spinner animation="border" variant={darkMode ? "light" : "primary"} />
          </div>
        ) : (
          <ListGroup>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <ListGroup.Item
                  key={msg.id}
                  className={`${
                    msg.senderId === currentUser.userId ? "text-end" : "text-start"
                  } ${darkMode ? "bg-dark text-white" : msg.senderId === currentUser.userId ? "bg-primary text-white" : "bg-light text-dark"}`}
                >
                  {msg.content}
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center p-3">No messages</p>
            )}
          </ListGroup>
        )}
      </div>
      <MessageInput selectedChat={selectedChat} onMessageSent={setMessages} darkMode={darkMode} />
    </div>
  );
};

export default ChatWindow;

