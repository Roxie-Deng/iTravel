import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PreferenceForm from './PreferenceForm';
import RecommendationList from './RecommendationList';
import './App.css';

const App = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // 新增的loading状态

  const parseRecommendations = (text) => {
    const recommendations = [];
    const lines = text.split('\n');
    let currentPOI = null;

    lines.forEach(line => {
      const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\:\s(.+)/);
      if (match) {
        if (currentPOI) {
          recommendations.push(currentPOI);
        }
        currentPOI = {
          name: match[1],
          description: match[2],
          imageUrl: '' // 这里暂时没有图像URL，可以根据需要添加默认图片或其他逻辑
        };
      } else if (currentPOI) {
        currentPOI.description += ' ' + line;
      }
    });

    if (currentPOI) {
      recommendations.push(currentPOI);
    }

    return recommendations;
  };

  const getRecommendationsFromBackend = async (destination, preferences) => {
    const query = preferences.visit.join(', ');
    setLoading(true); // 设置loading状态为true
    const response = await fetch('http://localhost:8080/api/kimi/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'kimi',
        messages: [
          {
            role: 'user',
            content: `Recommend 3 points of interest in ${destination} for these categories: ${query}.`
          }
        ],
        use_search: false,
        stream: false
      })
    });

    const data = await response.json();
    console.log("API response data:", data); // 调试信息
    const recommendationsContent = data.choices[0].message.content;
    const recommendationsData = parseRecommendations(recommendationsContent);
    setLoading(false); // 设置loading状态为false
    return recommendationsData;
  };

  const handleSubmit = async (destination, preferences) => {
    try {
      const recommendationsData = await getRecommendationsFromBackend(destination, preferences);
      console.log("Fetched recommendations:", recommendationsData); // 调试信息
      setRecommendations(recommendationsData);
      setFormSubmitted(true);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      setLoading(false); // 设置loading状态为false，即使在发生错误时
    }
  };

  return (
    <Router>
      <div>
        <h1>POI Recommendations</h1>
        <nav>
          <Link to="/preferences/test-destination">Go to Preference Form with Test Destination</Link>
        </nav>
        <Routes>
          <Route path="/preferences/:destination" element={<PreferenceForm onSubmit={handleSubmit} />} />
          <Route path="/recommendations" element={loading ? <div className="loading-spinner"></div> : <RecommendationList recommendations={recommendations} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
