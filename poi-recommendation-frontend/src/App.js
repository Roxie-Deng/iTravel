import React, { useState } from 'react';
import PreferenceForm from './PreferenceForm';
import RecommendationList from './RecommendationList';
import './App.css';

const App = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getRecommendations = async (preferences) => {
    try {
      const visitCategories = preferences.visit.join(',');
      console.log("Sending categories:", visitCategories);
      const response = await fetch(
        `http://localhost:8080/api/recommendations/poi?category=${visitCategories}`
      );
      const data = await response.json();
      console.log("Fetched recommendations:", data);
      setRecommendations(data);
      setFormSubmitted(true);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  };

  return (
    <div>
      <h1>POI Recommendations</h1>
      {!formSubmitted ? (
        <PreferenceForm onSubmit={getRecommendations} />
      ) : (
        <RecommendationList recommendations={recommendations} />
      )}
    </div>
  );
};

export default App;
