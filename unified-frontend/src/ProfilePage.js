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

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      console.log("Using token: ", token);

      const response = await fetch('http://localhost:8080/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error uploading file: ' + response.statusText);
      }

      const fileId = await response.text();

      const newAvatarUrl = `http://localhost:8080/api/files/download/${response.data}`;
      setAvatarPreview(newAvatarUrl);
      setAuth({ isLoggedIn: true, user: { ...user, avatarUrl: newAvatarUrl } }); // Update the user context with the new avatar URL
      alert('File uploaded successfully: ' + fileId);
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Error uploading file');
    }
  };


  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {

      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
      // TODO: 实现头像上传逻辑
      return () => URL.revokeObjectURL(objectUrl);
      handleFileUpload(file);
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

        <input type="file" onChange={handleAvatarChange} />

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
