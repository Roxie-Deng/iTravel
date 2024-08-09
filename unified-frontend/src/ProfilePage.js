import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Link, Navigate } from 'react-router-dom';
import placeholderImage from './assets/images/placeholder-image.png';
import './ProfilePage.css';
import axios from 'axios';

const ProfilePage = () => {
  const { user } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState('');
  const [guides, setGuides] = useState([]);
  const [pois, setPois] = useState([]);

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatarUrl || placeholderImage);
      const fetchUserGuides = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/guides/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setGuides(response.data);
        } catch (error) {
          console.error('Failed to fetch guides:', error);
        }
      };

      const fetchUserPOIs = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/pois/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setPois(response.data);
        } catch (error) {
          console.error('Failed to fetch POIs:', error);
        }
      };

      fetchUserGuides();
      fetchUserPOIs();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
      // TODO: 实现头像上传逻辑
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const Item = ({ title, description }) => (
    <div className="item">
      <img src={placeholderImage} alt={title} className="item-image" />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="user-profile">
        <img src={avatarPreview} alt={user.username} className="profile-picture" />
        <h1>{user.username}</h1>
        <Link to="/edit-profile">Edit Profile</Link>
      </div>
      <div className="section">
        <h2>My Guides</h2>
        <div className="items-container">
          {guides.map(guide => (
            <Item key={guide.id} title={guide.title} description={guide.description} />
          ))}
        </div>
      </div>
      <div className="section">
        <h2>My POIs</h2>
        <div className="items-container">
          {pois.map(poi => (
            <Item key={poi.id} title={poi.title} description={poi.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
