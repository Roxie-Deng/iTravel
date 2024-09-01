import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './PreferenceForm.css';

const PreferenceForm = ({ onSubmit }) => {
    const location = useLocation();
    const { destination } = location.state || {};
    const navigate = useNavigate();
    const { user } = useAuth();
    const categories = [
        'Natural landscapes',
        'Historical landmarks',
        'Modern architecture',
    ];

    const [checkedState, setCheckedState] = useState(new Array(categories.length).fill(false));

    useEffect(() => {
        console.log("Received destination:", destination);
        console.log("User state:", user);
    }, [destination,user]);

    const handleCheckboxChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!destination) {
            console.error('Destination is required');
            return;
        }
        const selectedCategories = categories.filter((_, index) => checkedState[index]);
        onSubmit(destination, { visit: selectedCategories });
        navigate('/recommendations');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="section">
                <br></br>
                <br></br>
                <br></br>
                <h2>Choose your interests for {destination}</h2>
                <h3>I want to visit:</h3>
                <div className="checkbox-group">
                    {categories.map((category, index) => (
                        <div key={index} className="category-box">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checkedState[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PreferenceForm;
