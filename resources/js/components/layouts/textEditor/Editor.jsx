import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorText = ({ content, handleEditorChange }) => {
    const handleChange = (content, editor) => {
        handleEditorChange(content);
    };

    return (
        <Editor
            apiKey="q4yu0eqvznbvqzi0or2a52488dzxj1sfmu0bfpnoqiarnrlo"
            value={content}
            init={{
                plugins: "lists",
                toolbar: "bullist numlist",
            }}
            onEditorChange={handleChange}
        />
    );
};

export default EditorText;
