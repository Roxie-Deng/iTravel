import React, { useState } from 'react';
import './RecommendationList.css';

const RecommendationList = ({ recommendations, onFetchMoreRecommendations, onSave }) => {
    const [savedPOI, setSavedPOI] = useState(null);

    const handleSave = async (poi) => {
        try {
            await onSave(poi);
            setSavedPOI(poi.name);
            setTimeout(() => setSavedPOI(null), 3000); // 3秒后清除消息
        } catch (error) {
            console.error('Failed to save POI:', error);
        }
    };

    return (
        <div className="recommendation-list">
            <h2>Recommendations</h2>
            <div className="recommendations-container">
                {recommendations.map((poi) => (
                    <div key={poi.name} className="recommendation-card">
                        <img
                            src={poi.imageUrl}
                            alt={poi.name}
                            className="poi-image"
                        />
                        <h3>{poi.name}</h3>
                        <p>{poi.description}</p>
                        <p>
                            <a
                                href={`https://www.google.com/search?q=${encodeURIComponent(poi.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="details-link"
                            >
                                Details
                            </a>
                        </p>
                        <button onClick={() => handleSave(poi)}>Save</button>
                        {savedPOI === poi.name && <p className="save-message">POI saved successfully!</p>}
                    </div>
                ))}
            </div>
            <button className="change-button" onClick={onFetchMoreRecommendations}>
                Change
            </button>
        </div>
    );
};

export default RecommendationList;
