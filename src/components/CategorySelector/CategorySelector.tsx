import React from "react";

import './CategorySelector.css'

const CategorySelector = () => {
    return (
        <div className="CategorySelector">
            <label>Task Category*</label>
            <div className="CategoryButtons">
                <button className="CategoryButton">Work</button>
                <button className="CategoryButton">Personal</button>
            </div>
        </div>
    );
};

export default CategorySelector;
