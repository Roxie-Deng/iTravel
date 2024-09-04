import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Navigate, Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import UserGuides from './UserGuides';
import UserPOIs from './UserPOIs';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('ProfilePage user:', user); // 检查 user 对象是否正确传递
  }, [user]);

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
      {/* Guides Section */}
      <section className="guides-section">
        <h2>My Guides</h2>
        <UserGuides />
      </section>

      {/* POIs Section */}
      <section className="pois-section">
        <h2>My POIs</h2>
        <UserPOIs />
      </section>
    </div>
  );
};

export default ProfilePage;
