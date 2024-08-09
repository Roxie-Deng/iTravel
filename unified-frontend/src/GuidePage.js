import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './GuidePage.css';
import axios from 'axios';

const GuidePage = ({ guide }) => {
  const location = useLocation();
  const destination = location.state?.destination;
  const [savedMessage, setSavedMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    console.log("Received destination:", destination);
    console.log("Guide data received:", guide);
  }, [destination, guide]);

  const handleSave = async () => {
    if (!user) {
      alert('Please log in');
      return;
    }

    const token = localStorage.getItem('token');
    console.log("JWT Token:", token); // 添加这行来调试看看token是否正确

    try {
      const response = await axios.post(
        'http://localhost:8080/api/guides/guide',
        { ...guide },
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
    <div className="guide-page">
      {guide.length > 0 ? (
        <div>
          {guide.map((day, index) => (
            <div key={index} className="guide-card">
              <h2>{day.day}</h2>
              <div className="guide-content">
                {day.activities.map((activity, idx) => (
                  <div key={idx}>
                    <h3>{activity.time}</h3>
                    <p>{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="save-button" onClick={handleSave}>Save</button>
          {user && savedMessage && <p className="success-message">{savedMessage}</p>}
        </div>
      ) : (
        <p>No guide available. Please return home and submit a destination.</p>
      )}
      <Link to="/preferences" state={{ destination }}>Recommend Attractions and Activities</Link>
    </div>
  );
};

export default GuidePage;
