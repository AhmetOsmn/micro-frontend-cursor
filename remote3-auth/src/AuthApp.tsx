import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

const AuthApp: React.FC = () => {
  return (
    <div className="auth-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AuthApp; 