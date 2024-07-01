import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { user, login, fetchUserProfile } = useContext(AuthContext);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if (token) {
      localStorage.setItem('token', token);
      fetchUserProfile();
    }
  }, [fetchUserProfile]);

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button
          onClick={login}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Login with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default Login;
