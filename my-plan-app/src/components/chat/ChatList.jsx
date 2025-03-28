import React from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";

const ChatList = ({ contacts, onSelectChat, loading }) => {

  return (
    <div>
      <h5 className="p-3 bg-light text-center">Chat</h5>
      {loading ? (
        <div className="text-center p-3">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <ListGroup>
          {contacts.length > 0 ? (
            contacts.map((user) => (
              <ListGroup.Item
                key={user.username}
                action
                onClick={() => onSelectChat(user)}
                className="d-flex align-items-center"
              >
                <PersonFill className="me-2 text-primary" size={20} />
                {user.firstName} {user.lastName}
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-center p-3">Nessuna conversazione</p>
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default ChatList;
