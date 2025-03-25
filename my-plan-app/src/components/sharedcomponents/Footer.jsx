import React, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { darkMode } = useContext(DarkModeContext);

    return (
        <footer className={`footer ${darkMode ? "dark-mode" : "light-mode"}`}>
            &copy; {currentYear} - Plan App
        </footer>
    );
};

export default Footer;
