import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './GuidePage.css';

const GuidePage = ({ guide, onSave }) => {
  const location = useLocation();
  const destination = location.state?.destination;
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    console.log("Received destination:", destination);
    console.log("Guide data received:", guide);
  }, [destination, guide]);

  if (!guide || guide.length === 0) {
    console.error("Guide data is empty or undefined:", guide);
  }

  const handleSave = async () => {
    try {
      await onSave({
        destination: destination,
        guide: JSON.stringify(guide),
        time: new Date().toISOString(),
        description: `Travel guide for ${destination}`
      });
      setSaveMessage('Guide saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000); // 3秒后清除消息
    } catch (error) {
      console.error('Failed to save guide:', error);
      setSaveMessage('Failed to save guide.');
      setTimeout(() => setSaveMessage(''), 3000);
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
          {saveMessage && <p className="save-message">{saveMessage}</p>}
        </div>
      ) : (
        <p>No guide available. Please return home and submit a destination.</p>
      )}
      <Link to="/preferences" state={{ destination }}>Recommend Attractions and Activities</Link>
    </div>
  );
};

export default GuidePage;
