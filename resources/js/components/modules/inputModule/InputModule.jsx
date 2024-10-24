import React from "react";

const Input = ({ labelText, type, name, value, handleChange }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{labelText}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={type === "file" ? undefined : value}
                onChange={(e) =>
                    type === "file"
                        ? handleChange(e, name)
                        : handleChange(e.target.value, name)
                }
            />
        </div>
    );
};

export default Input;
