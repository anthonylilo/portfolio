import React, { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const SelectOption = ({onChange}) => {
    return (
        <div className="select-container">
            <label htmlFor="language">Language</label>
            <select onChange={onChange} className="select-box" name="language" id="language">
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
            </select>
            <div className="icon-container">
                <FaArrowDown />
            </div>
        </div>
    );
};

export default SelectOption;
