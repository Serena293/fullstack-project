/**
 * ChatPage Component
 * 
 * Displays a chat interface where users can select a contact from the list to chat with. 
 * Shows a loading spinner while fetching contacts, and allows users to view selected chat.
 */

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ChatList from "./ChatList";
import useAuth from "../../hooks/useAuth";
import ChatWindow from "./ChatWindow";
import CustomNavbar from "../sharedcomponents/CustomNavbar";
import Footer from "../sharedcomponents/Footer";

const ChatPage = () => {
  const { currentUser } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  // Logs when selectedChat changes
  useEffect(() => {
    console.log("SelectedChat changed:", selectedChat);
  }, [selectedChat]);

  // Select a contact to start chatting
  const handleChatSelect = (contact) => {
    console.log("Selected Chat - full object:", contact);
    setSelectedChat(contact);
  };

  // Fetch contacts when component mounts or currentUser changes
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Fetching contacts with token:", token); // Debug token
        
        const response = await fetch(`http://localhost:8080/api/users/${currentUser.userId}/contacts`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Fetched contacts data:", data); // Debug data
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      console.log("Current user ID:", currentUser.userId); // Debug user ID
      fetchContacts();
    }
  }, [currentUser]);

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <CustomNavbar />
      
      <Row className="flex-grow-1">
        <Col md={4} className="border-end">
          <ChatList 
            contacts={contacts} 
            onSelectChat={handleChatSelect} 
            loading={loading} 
          />
        </Col>
        <Col md={8} className="d-flex flex-column">
          {selectedChat ? (
            <>
              {/* <p>Debug: Chat selected with ID {selectedChat.userId}</p> */}
              <ChatWindow selectedChat={selectedChat} className="flex-grow-1" />
            </>
          ) : (
            <p className="text-center p-3 flex-grow-1">Select a chat from the list</p>
          )}
        </Col>
      </Row>
  
      <Footer />
    </Container>
  );
}

export default ChatPage;
