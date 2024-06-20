import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './components/auth/Login';
import UserProfile from './components/user/UserProfile';
import AuthProvider from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
);
