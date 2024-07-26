import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchContentFromBackend, fetchImageUrl } from './utils/api';
import { AuthProvider, useAuth } from './AuthContext';
import HomePage from './HomePage';
import GuidePage from './GuidePage';
import PreferenceForm from './PreferenceForm';
import RecommendationList from './RecommendationList';
import LoadingSpinner from './LoadingSpinner';
import Navigation from './Navigation';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProfilePage from './ProfilePage';
import './App.css';

const App = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [guide, setGuide] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentDestination, setCurrentDestination] = useState('');
  const [preferences, setPreferences] = useState({ visit: [] });
  const { user } = useAuth();

  React.useEffect(() => {
    console.log("User data in App:", user);
  }, [user]);

  const handleGuideSubmit = async (destination, days) => {
    setCurrentDestination(destination);
    setConversation([]);
    await fetchContentFromBackend(destination.toUpperCase(), 'guide', {
      model: 'kimi',
      messages: [{
        role: 'user',
        content: `Generate a general travel itinerary for ${destination.toUpperCase()} for ${days} day(s) based on the current season, outlining activities for each day. List the activities in an itemized format and keep the description under 300 words. Please provide a detailed itinerary in a structured format for a trip lasting [number of days] days. Each day should be clearly labeled starting from Day 1 to Day [number of days], followed by a descriptive title for the day's theme. Each activity should be listed with a specific time block (Morning, Late Morning, Afternoon, Evening). Here is the format I need:

- **Day 1: [Theme of the Day]**
  - Morning: [Activity]
  - Late Morning: [Activity]
  - Afternoon: [Activity]
  - Evening: [Activity]

Continue this format for each subsequent day.
Be realistic, especially for one (or two)-day trip. Only include the itinerary details and activities without any additional commentary (eg."Certainly! Here is...").`
      }],
      use_search: false,
      stream: false
    }, setLoading, setConversation, setRecommendations, setGuide);
  };

  const handleSubmit = async (destination, preferences) => {
    setCurrentDestination(destination);
    setPreferences(preferences);
    setConversation([]);
    const query = preferences.visit.join(', ');
    await fetchContentFromBackend(destination.toUpperCase(), 'recommendations', {
      model: 'kimi',
      messages: [{
        role: 'user',
        content: `Recommend 3 points of interest in ${destination.toUpperCase()} for these categories: ${query}.`
      }],
      use_search: false,
      stream: false
    }, setLoading, setConversation, setRecommendations, setGuide);
  };

  const fetchMoreRecommendations = async () => {
    setLoading(true);
    const query = preferences.visit.join(', ');
    const newMessage = {
      role: 'user',
      content: `Recommend 3 other points of interest in ${currentDestination.toUpperCase()} for these categories: ${query}. Make sure the recommendations are different from any previously provided.`
    };
    await fetchContentFromBackend(currentDestination, 'recommendations', {
      model: 'kimi',
      messages: [...conversation, newMessage],
      use_search: false,
      stream: false
    }, setLoading, setConversation, setRecommendations, setGuide);
    setLoading(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage onSubmit={handleGuideSubmit} />} />
            <Route path="/guide" element={loading ? <div className="loading-spinner"></div> : <GuidePage guide={guide} />} />
            <Route path="/preferences" element={<PreferenceForm onSubmit={handleSubmit} />} />
            <Route path="/recommendations" element={
              loading || imageLoading ? <LoadingSpinner /> :
                <RecommendationList
                  recommendations={recommendations}
                  onFetchMoreRecommendations={fetchMoreRecommendations}
                />
            } />
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
