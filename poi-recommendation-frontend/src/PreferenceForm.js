
import React, { useState } from 'react';
import './PreferenceForm.css';

const PreferenceForm = ({ onSubmit }) => {
    const categories = [
        'Natural landscapes',
        'Historical landmarks',
        'Modern architecture',
        'Cultural sites'
    ];

    const [checkedState, setCheckedState] = useState(
        new Array(categories.length).fill(false)
    );

    const handleCheckboxChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
        console.log("Updated preferences:", updatedCheckedState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCategories = categories.filter((_, index) => checkedState[index]);
        console.log("Submitted preferences:", selectedCategories);
        onSubmit({ visit: selectedCategories });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="section">
                <h2>I want to visit:</h2>
                <p>Tick the checkboxes based on your interests</p>
                <div className="checkbox-group">
                    {categories.map((category, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                value={category}
                                checked={checkedState[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default PreferenceForm;
