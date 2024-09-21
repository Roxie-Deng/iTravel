import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Custom CSS

const HomePage = ({ onSubmit }) => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(1); // Store the number of days
  const navigate = useNavigate();

  const handleGuideSubmit = (event) => {
    event.preventDefault();
    onSubmit(destination, days); // Call the function passed from App.js
    navigate('/guide', { state: { destination, days } }); // Redirect and pass the days value
  };

  return (
    <div className="homepage-container">
      <div className="hero-section">
        <h1 className="hero-title">iTravel: Explore the whole world</h1>
        <p className="hero-subtitle">Where to go?</p>
        <form onSubmit={handleGuideSubmit} className="homepage-form">
          <div className="homepage-form-group">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your travel destination"
              className="homepage-input"
            />
          </div>
          <div className="homepage-form-group">
            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="homepage-select"
            >
              {[...Array(14)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'day' : 'days'}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="homepage-button">Submit</button>
        </form>
      </div>


    </div>
  );
};

export default HomePage;
