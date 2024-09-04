import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './ProfilePage.css'; // 引入新的样式文件

const UserPOIs = () => {
  const { user } = useAuth();
  const [pois, setPois] = useState([]);

  useEffect(() => {
    if (user && user.id) { // 使用 id 而非 username
      const fetchUserPOIs = async () => {
        try {
          console.log(`Fetching POIs for user ID: ${user.id}`); // 打印调试信息
          const response = await axios.get(`http://localhost:8080/api/pois/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setPois(response.data);
          console.log('POIs fetched successfully:', response.data);
        } catch (error) {
          console.error('Failed to fetch POIs:', error);
        }
      };

      fetchUserPOIs();
    }
  }, [user]);

  return (
    <div className="items-container">
      {pois.length > 0 ? (
        pois.map(poi => (
          <div key={poi.id} className="item-card"> {/* 使用 item-card 类创建卡片布局 */}
            <img src={poi.imageUrl} alt={poi.name} className="poi-image" /> {/* 调整图片大小 */}
            <div className="item-content">
              <h3>{poi.name}</h3>
              <p>{poi.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No POIs found.</p>
      )}
    </div>
  );
};

export default UserPOIs;
