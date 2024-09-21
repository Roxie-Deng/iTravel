import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const GuidePage = ({ guide }) => {
  const location = useLocation();
  const destination = location.state?.destination;
  const [savedMessage, setSavedMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    console.log("Received destination:", destination);
    console.log("Guide data received:", guide);
    console.log("User state:", user);
  }, [destination, guide, user]);

  const handleSave = async () => {
    if (!user) {
      alert('Please log in');
      return;
    }

    const token = localStorage.getItem('token');
    console.log("JWT Token:", token); // 调试查看token

    const guideData = {
      userId: user.id,
      destination: destination || "Unknown",  // 确保有目的地信息
      guide: JSON.stringify(guide),  // 将指南内容转换为字符串
      time: new Date().toISOString(),  // 添加时间戳
      description: `Travel guide for ${destination}`  // 添加描述
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/guides/guide',
        guideData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSavedMessage('Guide saved successfully!');
    } catch (error) {
      console.error('Failed to save guide:', error);
      setSavedMessage('Failed to save guide.');
    }
  };

  return (
    <div className="p-5 text-center">
      {guide.length > 0 ? (
        <div>
          {guide.map((day, index) => (
            <div key={index} className="guide-card bg-gray-100 border border-gray-300 rounded-lg shadow-md my-5 mx-auto p-5 max-w-xl text-left">
              <h2 className="text-2xl font-bold mb-3">{day.day}</h2>
              <div className="guide-content mb-5">
                {day.activities.map((activity, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-lg font-bold">{activity.time}</h3>
                    <p className="text-left">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            className="save-button bg-blue-500 text-white font-semibold py-2 px-4 rounded w-32 mx-auto mt-4 hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
          {user && savedMessage && <p className="save-message text-green-500 font-semibold mt-2">{savedMessage}</p>}
        </div>
      ) : (
        <p className="text-lg font-semibold mt-4">No guide available. Please return home and submit a destination.</p>
      )}
      <Link
        to="/preferences"
        state={{ destination }}
        className="recommend-link block mt-6 text-blue-500 text-lg hover:underline"
      >
        Recommend Attractions and Activities
      </Link>
    </div>
  );
};

export default GuidePage;
