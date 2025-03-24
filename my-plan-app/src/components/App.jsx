import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import RegisterForm from './login/RegisterForm';  
import HomePage from './home/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />  
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} /> 
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
