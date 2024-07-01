import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import UserProfile from './components/user/UserProfile';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<UserProfile />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
