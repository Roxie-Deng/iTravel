import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './ProfilePage.css';  // 继续使用 ProfilePage.css

const UserGuides = () => {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (user && user.id) { // 使用 user.id
      const fetchUserGuides = async () => {
        try {
          console.log(`Fetching guides for user ID: ${user.id}`); // 打印调试信息
          const response = await axios.get(`http://localhost:8080/api/guides/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setGuides(response.data); // 保存获取到的数据
          console.log('Guides fetched successfully:', response.data);
        } catch (error) {
          console.error('Failed to fetch guides:', error);
        }
      };

      fetchUserGuides();
    }
  }, [user]);

  // Handle delete guide
  const handleDeleteGuide = async (guideId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this guide?');
    if (!isConfirmed) {
      return; // Exit if the user cancels
    }

    try {
      // Send delete request to the server
      const response = await axios.delete(`http://localhost:8080/api/guides/delete/${guideId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // If successful, remove the deleted guide from the state
      if (response.status === 200) {
        setGuides((prevGuides) => prevGuides.filter((guide) => guide.id !== guideId));
        console.log('Guide deleted successfully:', guideId);
      }
    } catch (error) {
      console.error('Failed to delete guide:', error);
    }
  };

  // Helper function: Capitalize the first letter of the destination
  const capitalizeDestination = (destination) => {
    if (!destination) return "";
    return destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();
  };

  // 渲染 guide 中的活动
  const renderGuideActivities = (activities) => {
    return activities.map((activity, index) => (
      <li key={index}>
        <strong>{activity.time}</strong>: {activity.description}
      </li>
    ));
  };

  // 渲染每个 day
  const renderGuideDays = (guide) => {
    try {
      const parsedGuide = JSON.parse(guide); // 将 guide 字符串解析为对象
      return parsedGuide.map((day, index) => (
        <div key={index} className="guide-day">
          <h4>{day.day}</h4>
          <ul>
            {renderGuideActivities(day.activities)}
          </ul>
        </div>
      ));
    } catch (error) {
      console.error("Failed to parse guide:", error);
      return <p>Invalid guide format.</p>;
    }
  };

  return (
    <div className="section">
      <div className="items-container">
        {guides.length > 0 ? (
          guides.map(guide => (
            <div key={guide.id} className="item-card">  {/* 使用 item-card 进行卡片布局 */}
              <h3>{capitalizeDestination(guide.destination)}</h3> {/* 调用 capitalizeDestination 函数 */}
              <p>{guide.description}</p>
              <div className="item-content">
                {renderGuideDays(guide.guide)}
              </div>
              <button onClick={() => handleDeleteGuide(guide.id)} className="bg-black-500 text-white py-2 px-4 rounded hover:bg-black-700">Delete</button>
            </div>
          ))
        ) : (
          <p>No guides found.</p>
        )}
      </div>
    </div>
  );
};

export default UserGuides;
