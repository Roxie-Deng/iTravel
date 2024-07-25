import React from 'react';
import { useAuth } from './AuthContext'; 

const ProfilePage = () => {
  const { user } = useAuth(); 
  console.log("ProfilePage: Current user state", user); 

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      <h1>Welcome! This is a temporary profile page</h1>
      <p><strong>Username:</strong> {user.username}</p>
    </div>
  );
};

export default ProfilePage;