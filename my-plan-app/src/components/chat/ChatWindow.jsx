import React, { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import MessageInput from "./MessageInput";

const ChatWindow = ({ selectedChat }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || !selectedChat) {
        console.log("user o selectedChat non sono definiti");
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

        console.log("Response status:", response.status); 
        if (!response.ok) {
          throw new Error("Errore nel recupero dei messaggi");
        }

        const data = await response.json();
        console.log("Messages received:", data); 
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChat) {
      console.log("selectedChat is defined, fetching messages...");
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // Polling ogni 5s
      return () => clearInterval(interval);
    }
  }, [selectedChat, currentUser]);

  return (
    <div className="p-3 d-flex flex-column" style={{ height: "100vh" }}>
      <h5 className="text-center bg-light p-2">
        Chat con {selectedChat ? `${selectedChat.firstName} ${selectedChat.lastName}` : "Seleziona un contatto"}
      </h5>
      <div className="flex-grow-1 overflow-auto">
        {loading ? (
          <div className="text-center p-3">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <ListGroup>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <ListGroup.Item
                  key={msg.id}
                  className={
                    msg.senderId === currentUser.userId
                      ? "text-end bg-primary text-white"
                      : "text-start bg-light"
                  }
                >
                  {msg.content}
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center p-3">Nessun messaggio</p>
            )}
          </ListGroup>
        )}
      </div>
      <MessageInput selectedChat={selectedChat} onMessageSent={setMessages} />
    </div>
  );
};

export default ChatWindow;