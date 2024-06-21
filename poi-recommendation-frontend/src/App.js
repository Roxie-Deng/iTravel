// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import PreferenceForm from './PreferenceForm';
// import RecommendationList from './RecommendationList';
// import './App.css';

// const App = () => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const parseRecommendations = (text) => {
//     const recommendations = [];
//     const lines = text.split('\n');
//     let currentPOI = null;

//     lines.forEach(line => {
//       const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\:\s(.+)/);
//       if (match) {
//         if (currentPOI) {
//           recommendations.push(currentPOI);
//         }
//         currentPOI = {
//           name: match[1],
//           description: match[2],
//           imageUrl: '' // 这里暂时没有图像URL，可以根据需要添加默认图片或其他逻辑
//         };
//       } else if (currentPOI) {
//         currentPOI.description += ' ' + line;
//       }
//     });

//     if (currentPOI) {
//       recommendations.push(currentPOI);
//     }

//     return recommendations;
//   };

//   const getRecommendationsFromKIMI = async (destination, preferences) => {
//     const query = preferences.visit.join(', ');
//     const response = await fetch('https://kimi-free-api-nut5.onrender.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyLWNlbnRlciIsImV4cCI6MTcyNjQ4NTQ3MSwiaWF0IjoxNzE4NzA5NDcxLCJqdGkiOiJjcG9tcG5yM2Flc3Vob2U5cjNoMCIsInR5cCI6InJlZnJlc2giLCJzdWIiOiJjcG9tcG5yM2Flc3Vob2U5cjNmZyIsInNwYWNlX2lkIjoiY3BvbXBucjNhZXN1aG9lOXIzZWciLCJhYnN0cmFjdF91c2VyX2lkIjoiY3BvbXBucjNhZXN1aG9lOXIzZTAifQ.ZuchqSk2j9-s9Hz3-3sSCe9ktNzRhMTIG3AjtAs9dVuo62NyjnRTpWeppbKYoQsua3eCrM9GHm14qMrmbVAfwA'
//       },
//       body: JSON.stringify({
//         model: 'kimi',
//         messages: [
//           {
//             role: 'user',
//             // content: `Recommend 3 points of interest in ${destination} for these categories: ${query}.`
//             content: `Recommend 3 points of interest in Paris for these categories: ${query}.`
//           }
//         ],

//         use_search: false,
//         stream: false
//       })
//     });

//     const data = await response.json();
//     console.log("API response data:", data); // 调试信息
//     const recommendationsContent = data.choices[0].message.content;
//     const recommendationsData = parseRecommendations(recommendationsContent);
//     return recommendationsData;
//   };

//   const handleSubmit = async (destination, preferences) => {
//     try {
//       const recommendationsData = await getRecommendationsFromKIMI(destination, preferences);
//       console.log("Fetched recommendations:", recommendationsData); // 调试信息
//       setRecommendations(recommendationsData);
//       setFormSubmitted(true);
//     } catch (error) {
//       console.error("Failed to fetch recommendations:", error);
//     }
//   };

//   return (
//     <Router>
//       <div>
//         <h1>POI Recommendations</h1>
//         <nav>
//           <Link to="/preferences/test-destination">Go to Preference Form with Test Destination</Link>
//         </nav>
//         <Routes>
//           <Route path="/preferences/:destination" element={<PreferenceForm onSubmit={handleSubmit} />} />
//           <Route path="/recommendations" element={<RecommendationList recommendations={recommendations} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


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

  const getRecommendationsFromKIMI = async (destination, preferences) => {
    const query = preferences.visit.join(', ');
    setLoading(true); // 设置loading状态为true
    const response = await fetch('https://kimi-free-api-nut5.onrender.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyLWNlbnRlciIsImV4cCI6MTcyNjQ4NTQ3MSwiaWF0IjoxNzE4NzA5NDcxLCJqdGkiOiJjcG9tcG5yM2Flc3Vob2U5cjNoMCIsInR5cCI6InJlZnJlc2giLCJzdWIiOiJjcG9tcG5yM2Flc3Vob2U5cjNmZyIsInNwYWNlX2lkIjoiY3BvbXBucjNhZXN1aG9lOXIzZWciLCJhYnN0cmFjdF91c2VyX2lkIjoiY3BvbXBucjNhZXN1aG9lOXIzZTAifQ.ZuchqSk2j9-s9Hz3-3sSCe9ktNzRhMTIG3AjtAs9dVuo62NyjnRTpWeppbKYoQsua3eCrM9GHm14qMrmbVAfwA'
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
      const recommendationsData = await getRecommendationsFromKIMI(destination, preferences);
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
