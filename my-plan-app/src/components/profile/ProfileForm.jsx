import React, { useContext, useState } from "react";
import { DarkModeContext } from "../DarkModeContext";

const ProfileForm = () => {
  const { darkMode } = useContext(DarkModeContext);

  // Stato per modificare i dati
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    bio: "Sviluppatore appassionato di React e UI/UX.",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
    // Logica per salvare i dati aggiornati (API call, localStorage, ecc.)
  };

  return (
    <div className={`profile-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card profile-card">
              <div className="card-body">
                <h2 className="profile-title">Profilo Utente</h2>
                
                <div className="profile-info">
                  <label>Nome:</label>
                  {editing ? (
                    <input type="text" name="name" value={userData.name} onChange={handleChange} className="form-control" />
                  ) : (
                    <p>{userData.name}</p>
                  )}
                </div>

                <div className="profile-info">
                  <label>Email:</label>
                  <p>{userData.email}</p>
                </div>

                <div className="profile-info">
                  <label>Bio:</label>
                  {editing ? (
                    <textarea name="bio" value={userData.bio} onChange={handleChange} className="form-control"></textarea>
                  ) : (
                    <p>{userData.bio}</p>
                  )}
                </div>

                <div className="profile-actions">
                  {editing ? (
                    <button className="btn btn-primary" onClick={handleSave}>Salva</button>
                  ) : (
                    <button className="btn btn-warning" onClick={() => setEditing(true)}>Modifica</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
