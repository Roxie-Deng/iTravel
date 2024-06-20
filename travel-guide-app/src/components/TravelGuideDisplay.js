// src/components/TravelGuideDisplay.js
import React from 'react';

function TravelGuideDisplay({ guide }) {
    const formatGuide = (text) => {
        if (!text) return "Please wait......";

        // Split text to format
        const splitText = text.split("**"); // Assuming days are split with "**"
        const formattedText = splitText.map((part, index) => {
            if (index > 0) { // Skip the first part before "**Day 1"
                return `<p><strong>${part}</strong></p>`;
            }
            return "";
        }).join(""); // Convert array back to string

        // Remove unwanted parts (the search results reference)
        const cleanText = formattedText.split('搜索结果来自')[0];

        return cleanText;
    };

    return (
        <div className="Display">
            <h1>Travel Guide</h1>
            <div dangerouslySetInnerHTML={{ __html: formatGuide(guide) }} /> {/* Render formatted HTML */}
        </div>
    );
}

export default TravelGuideDisplay;
