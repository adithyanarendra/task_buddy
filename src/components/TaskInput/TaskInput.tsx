import React from "react";

import './TaskInput.css'

interface TaskInputProps {
    label: string;
    placeholder: string;
    isTextArea?: boolean;
    isDate?: boolean;
    maxLength?: number;
}

const TaskInput = ({ label, placeholder, isTextArea, isDate, maxLength }: TaskInputProps) => {
    return (
        <div className="TaskInput">
            <label>{label}</label>
            {isTextArea ? (
                <textarea placeholder={placeholder} maxLength={maxLength}></textarea>
            ) : isDate ? (
                <input type="date" placeholder={placeholder} />
            ) : (
                <input type="text" placeholder={placeholder} />
            )}
        </div>
    );
};

export default TaskInput;
