/**
 * ChatList Component
 *
 * Displays a list of contacts for chat selection.
 * Supports dark mode and shows a loading spinner while fetching data.
 */

import React, { useContext } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { DarkModeContext } from "../DarkModeContext";

const ChatList = ({ contacts, onSelectChat, loading }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`d-flex flex-column ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h5 className={`p-3 text-center ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
        Chat
      </h5>
      {loading ? (
        <div className="text-center p-3">
          <Spinner animation="border" variant={darkMode ? "light" : "primary"} />
        </div>
      ) : (
        <ListGroup>
          {contacts.length > 0 ? (
            contacts.map((user) => (
              <ListGroup.Item
                key={user.username}
                action
                onClick={() => onSelectChat(user)}
                className={`d-flex align-items-center ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
              >
                <PersonFill className={`me-2 ${darkMode ? "text-light" : "text-primary"}`} size={20} />
                {user.firstName} {user.lastName}
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-center p-3">No conversations available</p>
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default ChatList;
