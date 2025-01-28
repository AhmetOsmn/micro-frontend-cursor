import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

const AuthApp: React.FC = () => {
  return (
    <Router>
      <div className="auth-container">
        <nav>
          <ul>
            <li><Link to="/auth/login">Giriş Yap</Link></li>
            <li><Link to="/auth/register">Kayıt Ol</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default AuthApp; 