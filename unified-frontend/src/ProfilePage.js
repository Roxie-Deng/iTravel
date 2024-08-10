import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate, Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import UserGuides from './UserGuides';
import UserPOIs from './UserPOIs';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-container">
      <div className="user-profile">
        <UserAvatar />
        <Link to="/edit-profile">Edit Profile</Link>
      </div>
      <UserGuides />
      <UserPOIs />
    </div>
  );
};

export default ProfilePage;