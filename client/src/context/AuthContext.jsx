import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async () => {
    window.location.href = "http://localhost:5000/auth/linkedin";
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
