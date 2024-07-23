import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import localforage from 'localforage';
import PreferenceForm from './PreferenceForm';
import RecommendationList from './RecommendationList';
import HomePage from './HomePage';
import GuidePage from './GuidePage';
import LoadingSpinner from './LoadingSpinner';
import './App.css';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'iTravelCache',
  version: 1.0,
  storeName: 'keyvaluepairs',
  description: 'some description'
});

const App = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [guide, setGuide] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [conversation, setConversation] = useState([]); // 保存对话上下文
  const [currentDestination, setCurrentDestination] = useState(''); // 保存当前的destination
  const [preferences, setPreferences] = useState({ visit: [] }); // 保存当前的preferences

  const generateCacheKey = (type, destination, bodyContent) => {
    return `${type}:${destination.toUpperCase()}:${JSON.stringify(bodyContent)}`;
  };

  const fetchImageUrl = async (query) => {
    setImageLoading(true);
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
    } finally {
      setImageLoading(false);
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
          imageUrl: await fetchImageUrl(placeName)
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
    const cacheKey = generateCacheKey(type, destination, bodyContent);
    const cachedResponse = await localforage.getItem(cacheKey);

    if (cachedResponse) {
      if (type === 'recommendations') {
        setRecommendations(cachedResponse);
      } else if (type === 'guide') {
        setGuide(cachedResponse);
      }
      return;
    }

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
        await localforage.setItem(cacheKey, parsedRecommendations);
      } else if (type === 'guide') {
        const parsedGuide = parseContent(data.choices[0].message.content);
        setGuide(parsedGuide);
        await localforage.setItem(cacheKey, parsedGuide);
      }

      // 保存对话上下文
      setConversation(prevConversation => [
        ...prevConversation,
        ...bodyContent.messages,
        { role: 'assistant', content: data.choices[0].message.content }
      ]);

      setLoading(false);
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
      setLoading(false);
    }
  };

  const handleGuideSubmit = async (destination, days) => {
    setCurrentDestination(destination);
    setConversation([]); // 清空之前的对话上下文
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
    });
  };

  const handleSubmit = async (destination, preferences) => {
    setCurrentDestination(destination);
    setPreferences(preferences);
    setConversation([]); // 清空之前的对话上下文
    const query = preferences.visit.join(', ');
    await fetchContentFromBackend(destination.toUpperCase(), 'recommendations', {
      model: 'kimi',
      messages: [{
        role: 'user',
        content: `Recommend 3 points of interest in ${destination.toUpperCase()} for these categories: ${query}.`
      }],
      use_search: false,
      stream: false
    });
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
    });
    setLoading(false);
  };

  console.log({ HomePage, GuidePage, PreferenceForm, RecommendationList });

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/guide">Guide</Link>
          <Link to="/preferences">Preferences</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage onSubmit={handleGuideSubmit} />} />
          <Route path="/guide" element={loading ? <LoadingSpinner /> : <GuidePage guide={guide} />} />
          <Route path="/preferences" element={<PreferenceForm onSubmit={handleSubmit} />} />
          <Route path="/recommendations" element={
            loading || imageLoading ? <LoadingSpinner /> :
              <RecommendationList
                recommendations={recommendations}
                onFetchMoreRecommendations={fetchMoreRecommendations}
              />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
