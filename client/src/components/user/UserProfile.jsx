import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout, fetchUserProfile } = useContext(AuthContext);

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  fetchUserProfile();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="mb-4">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-4">
          <strong>Username:</strong> {user.username}
        </div>
        <div className="mb-4">
          <strong>Education:</strong> {user.education || 'N/A'}
        </div>
        <div className="mb-4">
          <strong>Professional Experience:</strong> {user.professional_experience || 'N/A'}
        </div>
        <div className="mb-4">
          <strong>Certificates:</strong> {user.certificates || 'N/A'}
        </div>
        <div className="mb-4">
          <strong>Skills:</strong> {user.skills || 'N/A'}
        </div>
        <button
          onClick={logout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
