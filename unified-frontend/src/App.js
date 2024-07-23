import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PreferenceForm from './PreferenceForm';
import RecommendationList from './RecommendationList';
import HomePage from './HomePage';
import GuidePage from './GuidePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Navigation from './Navigation';
import ProfilePage from './ProfilePage';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

const App = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [guide, setGuide] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();


  React.useEffect(() => {
    console.log("User data in App:", user);
  }, [user]);
 
  const fetchImageUrl = async (query) => {
    try {
      const response = await fetch('http://localhost:5000/get_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.image_url || 'https://via.placeholder.com/150';
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return 'https://via.placeholder.com/150';
    }
  };


  const parseRecommendations = async (text) => {
    const recommendations = [];
    const lines = text.split('\n');
    let currentPOI = null;

    for (const line of lines) {
      const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\:\s(.+)/);
      if (match) {
        if (currentPOI) {
          recommendations.push(currentPOI);
        }
        const placeName = match[1];
        currentPOI = {
          name: placeName,
          description: match[2],
          imageUrl: await fetchImageUrl(placeName) // 获取实际的图片链接
        };
      } else if (currentPOI) {
        currentPOI.description += ' ' + line;
      }
    }

    if (currentPOI) {
      recommendations.push(currentPOI);
    }

    return recommendations;
  };

  const parseContent = (responseBody) => {
    const dayRegex = /-\s\*\*Day\s(\d+):\s(.*?)\*\*\n(.*?)(?=\n- \*\*Day|\n\n- \*\*Day|\n\*\*Day|$)/gs;
    const activityRegex = /-\s(Morning|Late Morning|Afternoon|Evening):\s(.*?)\n/gs;

    let guide = [];

    let dayMatch;
    while ((dayMatch = dayRegex.exec(responseBody))) {
      let dayNumber = dayMatch[1];
      let dayTheme = dayMatch[2];
      let activities = dayMatch[3];

      let dayActivities = [];
      let activityMatch;
      while ((activityMatch = activityRegex.exec(activities))) {
        let time = activityMatch[1];
        let description = activityMatch[2].trim();

        dayActivities.push({
          time,
          description
        });
      }

      guide.push({
        day: `Day ${dayNumber}: ${dayTheme}`,
        activities: dayActivities
      });
    }

    return guide;
  };

  const fetchContentFromBackend = async (destination, type, bodyContent) => {
    setLoading(true);
    console.log(`Fetching ${type} for ${destination} with body:`, bodyContent);
    try {
      const response = await fetch(`http://localhost:8080/api/kimi/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyContent)
      });
      const data = await response.json();
      console.log(`Fetched ${type} data:`, data);

      if (type === 'recommendations') {
        const parsedRecommendations = await parseRecommendations(data.choices[0].message.content);
        setRecommendations(parsedRecommendations);
      } else if (type === 'guide') {
        setGuide(parseContent(data.choices[0].message.content));
      }
      setLoading(false);
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
      setLoading(false);
    }
  };

  const handleGuideSubmit = async (destination, days) => {
    setLoading(true);
    await fetchContentFromBackend(destination, 'guide', {
      model: 'kimi',
      messages: [{
        role: 'user',
        content: `Generate a general travel itinerary for ${destination} for ${days} day(s) based on the current season, outlining activities for each day. List the activities in an itemized format and keep the description under 300 words. Please provide a detailed itinerary in a structured format for a trip lasting [number of days] days. Each day should be clearly labeled starting from Day 1 to Day [number of days], followed by a descriptive title for the day's theme. Each activity should be listed with a specific time block (Morning, Late Morning, Afternoon, Evening). Here is the format I need:

- **Day 1: [Theme of the Day]**
  - Morning: [Activity]
  - Late Morning: [Activity]
  - Afternoon: [Activity]
  - Evening: [Activity]

Continue this format for each subsequent day.
Be realistic, espeacially for one (or two)-day trip. Only include the itinerary details and activities without any additional commentary (eg."Certainly! Here is...").`
      }],
      use_search: false,
      stream: false
    });
    setLoading(false);
  };

  const handleSubmit = async (destination, preferences) => {
    setLoading(true);
    const query = preferences.visit.join(', ');
    await fetchContentFromBackend(destination, 'recommendations', {
      model: 'kimi',
      messages: [{
        role: 'user',
        content: `Recommend 3 points of interest in ${destination} for these categories: ${query}.`
      }],
      use_search: false,
      stream: false
    });
    setLoading(false);
  };

  console.log({ HomePage, GuidePage, PreferenceForm, RecommendationList });

  return (
    <AuthProvider>
        <Router>
            <div>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage onSubmit={handleGuideSubmit} />} />
                    <Route path="/guide" element={loading ? <div className="loading-spinner"></div> : <GuidePage guide={guide} />} />
                    <Route path="/preferences" element={<PreferenceForm onSubmit={handleSubmit} />} />
                    <Route path="/recommendations" element={loading ? <div className="loading-spinner"></div> : <RecommendationList recommendations={recommendations} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/profile" element={<ProfilePage />} /> 
                </Routes>
            </div>
        </Router>
    </AuthProvider>
);
};

export default App;