import React, { useContext } from "react";
import CustomNavbar from "../sharedcomponents/CustomNavbar";
import Footer from "../sharedcomponents/Footer";
import ProfileForm from "./ProfileForm";
import { DarkModeContext } from "../DarkModeContext";

const ProfilePage = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`d-flex flex-column min-vh-100 ${darkMode ? "dark-mode" : "light-mode"}`}>
            <CustomNavbar />
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <ProfileForm />
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
