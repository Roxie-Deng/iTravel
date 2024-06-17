// import React, { useState, useEffect } from 'react';
// import './PreferenceForm.css';

// const PreferenceForm = ({ onSubmit }) => {
//     const [preferences, setPreferences] = useState({
//         visit: [],
//     });

//     const [submitTrigger, setSubmitTrigger] = useState(false);

//     const handleCheckboxChange = (value) => {
//         setPreferences((prevPreferences) => {
//             const newPreferences = { ...prevPreferences };
//             if (newPreferences.visit.includes(value)) {
//                 newPreferences.visit = newPreferences.visit.filter(
//                     (item) => item !== value
//                 );
//             } else {
//                 newPreferences.visit.push(value);
//             }
//             console.log("Updated preferences:", newPreferences); // 调试信息
//             return newPreferences;
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setSubmitTrigger(true);
//     };

//     useEffect(() => {
//         if (submitTrigger) {
//             console.log("Submitted preferences:", preferences); // 调试信息
//             onSubmit(preferences);
//             setSubmitTrigger(false); // Reset the trigger
//         }
//     }, [submitTrigger, preferences, onSubmit]);

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="section">
//                 <h2>I want to visit:</h2>
//                 <p>Tick the checkboxes based on your interests</p>
//                 <div className="checkbox-group">
//                     <label>
//                         <input
//                             type="checkbox"
//                             value="Natural landscapes"
//                             onChange={() => handleCheckboxChange('Natural landscapes')}
//                         />
//                         Natural landscapes
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             value="Historical landmarks"
//                             onChange={() => handleCheckboxChange('Historical landmarks')}
//                         />
//                         Historical landmarks
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             value="Modern architecture"
//                             onChange={() => handleCheckboxChange('Modern architecture')}
//                         />
//                         Modern architecture
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             value="Cultural sites"
//                             onChange={() => handleCheckboxChange('Cultural sites')}
//                         />
//                         Cultural sites
//                     </label>
//                 </div>
//             </div>

//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default PreferenceForm;

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
