import React from 'react';

function TravelGuideDisplay({ guide }) {
    return (
        <div>
            <h1>Travel Guide</h1>
            <p>{guide ? guide : "No guide available."}</p>
        </div>
    );
}

export default TravelGuideDisplay;
