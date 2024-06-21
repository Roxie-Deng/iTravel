import React from 'react';
import './RecommendationList.css';

const RecommendationList = ({ recommendations }) => {
    return (
        <div className="recommendation-list">
            <h2>Recommendations</h2>
            <div className="recommendations-container">
                {recommendations.map((poi) => (
                    <div key={poi.id} className="recommendation-card">
                        <img src={poi.imageUrl} alt={poi.name} className="poi-image" />
                        <h3>{poi.name}</h3>
                        <p>{poi.description}</p>
                        <p><a href="#" className="details-link">Details</a></p>
                        <button>Save</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationList;