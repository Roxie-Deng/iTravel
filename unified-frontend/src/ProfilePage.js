import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';  
import { Link } from 'react-router-dom';
import placeholderImage from './assets/images/placeholder-image.png';  
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();  // Getting the user info from context
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    // 设置头像预览：如果用户有头像URL则使用，否则使用占位图
    setAvatarPreview(user.avatarUrl || placeholderImage);
  }, [user.avatarUrl]);  // 依赖于 user.avatarUrl，当这个值变化时重新运行

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
      // TODO: 上传逻辑，上传后应更新 user.avatarUrl
      return () => URL.revokeObjectURL(objectUrl);  // 清理创建的URL，避免内存泄漏
    }
  };

  // Placeholder Data 
  // TODO: 实现Save保存到数据库从数据库获取
  const guides = [
    { id: 1, title: "Guide 1", description: "Discover historic landmarks" },
    { id: 2, title: "Guide 2", description: "Explore nature trails" }
  ];
  
  const pois = [
    { id: 1, title: "POI 1", description: "Central Park, NYC" },
    { id: 2, title: "POI 2", description: "Golden Gate Bridge, SF" }
  ];

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
        <img src={placeholderImage} alt={user.name} className="profile-picture" />
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
