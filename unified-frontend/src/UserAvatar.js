import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import placeholderImage from './assets/images/placeholder-image.png';
import './UserAvatar.css';

const UserAvatar = () => {
  const { user, updateUser } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (user && user.avatarUrl) {
      const avatarUrl = `http://localhost:8080/download_avatar/${user.avatarUrl}`;
      console.log('Setting avatar preview to:', user.avatarUrl);
      setAvatarPreview(avatarUrl);
    } else {
      setAvatarPreview(placeholderImage);
    }
  }, [user]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      console.log("Using token: ", token);

      const response = await fetch('http://localhost:8080/upload_avatar', {
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

      const newAvatarUrl = `http://localhost:8080/download_avatar/${fileId}`;
      console.log('Avatar uploaded successfully. New URL:', newAvatarUrl);
      setAvatarPreview(newAvatarUrl);
      updateUser({ isLoggedIn: true, user: { ...user, avatarUrl: fileId } }); // Update the user context with the new avatar URL
      
      // Debug logs
      console.log('Avatar preview should be set to:', newAvatarUrl);
      console.log('User context after upload:', user);
      
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
      setAvatarPreview(objectUrl);//临时URL用于预览
      handleFileUpload(file);//上传，成功后持久化URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="user-avatar">
      <img src={avatarPreview} alt={user.username} className="profile-picture" />
      <div className="user-details">
        <h1>{user.username}</h1>
        <input type="file" onChange={handleAvatarChange} className="avatar-upload" />
      </div>
    </div>
  );
};

export default UserAvatar;