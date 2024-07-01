import React, { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/profile');
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      setUser(data);
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = () => {
    window.location.href = 'http://localhost:5000/auth/linkedin';
  };

  const logout = () => {
    localStorage.removeItem('user');
    // localStorage.removeItem('token');
    Cookies.remove("authToken");
    Cookies.remove("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
