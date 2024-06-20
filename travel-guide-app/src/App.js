import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelForm from './components/TravelForm';
import TravelGuideDisplay from './components/TravelGuideDisplay';
import './App.css';

function Home({ onSubmit }) {
  const navigate = useNavigate();  
  const handleSubmission = (destination) => {
    onSubmit(destination);
    navigate("/display");  // Navigate after submission
  };

  return (
    <div className="Home">
      <TravelForm onSubmit={handleSubmission} />
    </div>
  );
}

function Display({ guide }) {
  return (
    <div className="Display">
      <TravelGuideDisplay guide={guide} />
    </div>
  );
}

function App() {
  const [guideContent, setGuideContent] = useState('');

  const getTravelGuide = async (destination) => {
    const prompt = `Generate a general travel itinerary for ${destination} based on the current season, outlining activities for each day. Decide the number of days based on your experience (Format: Day 1:..., Day 2:...). List the activities in an itemized format and keep the description under 300 words.`;
    
    const requestBody = {
      model: "kimi",
      messages: [{ role: "user", content: prompt }],
      use_search: true,
      stream: false
    };

    try {
      const response = await fetch('https://kimi-free-api-nut5.onrender.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyLWNlbnRlciIsImV4cCI6MTcyNjQ5ODQ0NSwiaWF0IjoxNzE4NzIyNDQ1LCJqdGkiOiJjcG9wdjNiM2Flc3Vob2ExMDRzMCIsInR5cCI6InJlZnJlc2giLCJzdWIiOiJjcG9wdjNiM2Flc3Vob2ExMDRwZyIsInNwYWNlX2lkIjoiY3BvcHYzYjNhZXN1aG9hMTA0cDAiLCJhYnN0cmFjdF91c2VyX2lkIjoiY3BvcHYzYjNhZXN1aG9hMTA0b2cifQ.fTNPMYsjjlZM6BUvdFyjmxYPtcGbEqySRkU1C-5Nl6i_jlQezyEVmRTwd_9XjcD2rSQCXBj0hu0i-B1HZNqDnQ'  
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data && data.choices && data.choices.length > 0) {
        setGuideContent(data.choices[0].message.content);
      } else {
        setGuideContent('Please wait......');
      }
    } catch (error) {
      console.error('Failed to fetch the travel guide:', error);
      setGuideContent('Failed to fetch guide');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home onSubmit={getTravelGuide} />} />
          <Route path="/display" element={<Display guide={guideContent} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
