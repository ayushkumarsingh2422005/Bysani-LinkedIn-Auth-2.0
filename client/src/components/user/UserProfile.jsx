import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

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
          <strong>Education:</strong> {user.education}
        </div>
        <div className="mb-4">
          <strong>Professional Experience:</strong> {user.professional_experience}
        </div>
        <div className="mb-4">
          <strong>Certificates:</strong> {user.certificates}
        </div>
        <div className="mb-4">
          <strong>Skills:</strong> {user.skills}
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
