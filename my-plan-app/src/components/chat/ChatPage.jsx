/**
 * ChatPage Component
 *
 * Displays a chat interface where users can select a contact from the list to chat with.
 * Shows a loading spinner while fetching contacts, and allows users to view selected chat.
 * Supports dark mode.
 */

import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatList from "./ChatList";
import useAuth from "../../hooks/useAuth";
import ChatWindow from "./ChatWindow";
import CustomNavbar from "../sharedcomponents/CustomNavbar";
import Footer from "../sharedcomponents/Footer";
import { DarkModeContext } from "../DarkModeContext";

const ChatPage = () => {
  const { currentUser } = useAuth();
  const { darkMode } = useContext(DarkModeContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    console.log("SelectedChat changed:", selectedChat);
  }, [selectedChat]);

  const handleChatSelect = (contact) => {
    setSelectedChat(contact);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch(
          `https://fullstack-project-70tb.onrender.com/api/users/${currentUser.userId}/contacts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchContacts();
    }
  }, [currentUser]);

  return (
    <Container
      fluid
      className={`vh-100 d-flex flex-column ${darkMode ? "dark-mode bg-dark text-white" : "light-mode bg-light text-dark"}`}
    >
      <CustomNavbar />

      <Row className="flex-grow-1">
        <Col md={4} className={`border-end ${darkMode ? "border-secondary" : ""}`}>
          <ChatList
            contacts={contacts}
            onSelectChat={handleChatSelect}
            loading={loading}
          />
        </Col>
        <Col md={8} className="d-flex flex-column">
          {selectedChat ? (
            <ChatWindow selectedChat={selectedChat} className="flex-grow-1" />
          ) : (
            <p className="text-center p-3 flex-grow-1">
              Select a chat from the list
            </p>
          )}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default ChatPage;
