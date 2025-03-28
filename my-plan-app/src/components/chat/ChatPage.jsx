import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ChatList from "./ChatList"; 
import useAuth from "../../hooks/useAuth"; 
import ChatWindow from "./ChatWindow";
import CustomNavbar from "../sharedcomponents/CustomNavbar"
import Footer from "../sharedcomponents/Footer"

const ChatPage = () => {
  const { currentUser } = useAuth(); 
  const [contacts, setContacts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedChat, setSelectedChat] = useState(null); 

  // Aggiunto log per tracciare i cambiamenti di selectedChat
  useEffect(() => {
    console.log("SelectedChat changed:", selectedChat);
  }, [selectedChat]);

  const handleChatSelect = (contact) => {
    console.log("Chat selezionata - oggetto completo:", contact);
    console.log("ID utente contatto:", contact?.userId);
    console.log("Nome contatto:", contact?.firstName, contact?.lastName);
    setSelectedChat(contact);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Fetching contacts with token:", token); // Debug token
        
        const response = await fetch(`http://localhost:8080/api/users/${currentUser.userId}/contacts`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
       
        console.log('Response status:', response.status); // Debug status
        console.log('Response headers:', Object.fromEntries(response.headers.entries())); // Debug headers

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Errore ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Dati contatti ricevuti:", data); // Debug dati ricevuti
        setContacts(data); 
      } catch (error) {
        console.error("Errore nel recupero dei contatti:", error);
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
              <p>Debug: Chat selezionata con ID {selectedChat.userId}</p>
              <ChatWindow selectedChat={selectedChat} className="flex-grow-1" />
            </>
          ) : (
            <p className="text-center p-3 flex-grow-1">Seleziona una chat dalla lista</p>
          )}
        </Col>
      </Row>
  
      <Footer />
    </Container>
  );
}

export default ChatPage;