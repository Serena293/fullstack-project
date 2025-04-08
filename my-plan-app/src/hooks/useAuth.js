import { useState, useEffect } from "react";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://fullstack-project-70tb.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenziali non valide");
      }

      const data = await response.json();
      console.log("Dati ricevuti dal backend:", data);

      localStorage.setItem("authToken", data.token);

      try {
        const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
        //console.log("Token decodificato:", decodedToken);

        if (!decodedToken.userId) {
          throw new Error("userId non trovato nel token");
        }

        setCurrentUser({ 
          userId: decodedToken.userId, 
          username: decodedToken.username 
        });
        console.log("User ID salvato:", decodedToken.userId); // Deve stampare 1

      } catch (err) {
        console.error("Errore nella decodifica del token:", err);
        throw new Error("Token JWT non valido");
      }

    } catch (error) {
      console.error("Errore nel login:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("Eseguo il logout...");
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("authToken");

        if (!token) {
          console.log("Nessun token trovato, utente non autenticato.");
          setCurrentUser(null);
          return;
        }

        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
         // console.log("Token decodificato:", decodedToken);

          if (!decodedToken.userId) {
            throw new Error("userId non trovato nel token");
          }

          setCurrentUser({ userId: decodedToken.userId, username: decodedToken.username });

        } catch (err) {
          console.error("Errore nella decodifica del token:", err);
          logout();
        }
      } catch (error) {
        console.error("Errore nel recupero utente:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { currentUser, loading, error, login, logout };
};

export default useAuth;
