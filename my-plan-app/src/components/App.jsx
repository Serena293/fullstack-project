import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import RegisterForm from "./login/RegisterForm";
import HomePage from "./home/HomePage";
import "bootstrap-icons/font/bootstrap-icons.css";
import ForgotPassword from "./login/ForgotPassword";
import ResetPassword from "./login/ResetPassword";
import {DarkModeProvider } from "./DarkModeProvider";
import ProfilePage from "./profile/ProfilePage"
import "../assets/scss/custom.scss";

function App() {
  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </DarkModeProvider>
  );
}

export default App;
