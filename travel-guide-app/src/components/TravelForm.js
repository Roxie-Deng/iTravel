import React, { useState } from 'react';

function TravelForm({ onSubmit }) {
    const [destination, setDestination] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(destination);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
            />
            <button type="submit">Get Travel Guide</button>
        </form>
    );
}

export default TravelForm;
