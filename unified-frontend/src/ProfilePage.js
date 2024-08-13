import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate, Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import UserGuides from './UserGuides';
import UserPOIs from './UserPOIs';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();

  // 调试日志
  console.log('User state:', user);

  if (!user || !user.id) { // 确保 user 和 user.id 存在
    console.log('Navigating to login page due to missing user or user.id');
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
