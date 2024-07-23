// import React from 'react';
// import './RecommendationList.css';

// const RecommendationList = ({ recommendations, onFetchMore }) => {
//     return (
//         <div className="recommendation-list">
//             <h2>Recommendations</h2>
//             <div className="recommendations-container">
//                 {recommendations.map((poi) => (
//                     <div key={poi.name} className="recommendation-card">
//                         <img
//                             src={poi.imageUrl}
//                             alt={poi.name}
//                             className="poi-image"
//                         />
//                         <h3>{poi.name}</h3>
//                         <p>{poi.description}</p>
//                         <p>
//                             <a
//                                 href={`https://www.google.com/search?q=${encodeURIComponent(poi.name)}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="details-link"
//                             >
//                                 Details
//                             </a>
//                         </p>
//                         <button>Save</button>
//                     </div>
//                 ))}
//             </div>
//             <button className="change-button" onClick={onFetchMore}>Change</button>
//         </div>
//     );
// };

// export default RecommendationList;



import React from 'react';
import './RecommendationList.css';

const RecommendationList = ({ recommendations, onFetchMoreRecommendations }) => {
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
                        <button>Save</button>
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
