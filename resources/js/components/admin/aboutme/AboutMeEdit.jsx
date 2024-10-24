import React, { useState } from "react";
import AdminLayout from "../../../Pages/admin/Admin";
import EditorText from "../../modules/textEditor/Editor";
import SelectOption from "../../modules/selectOption/SelectOption";
import axios from "axios";
import { usePage } from "@inertiajs/inertia-react";

const AboutMeEdit = () => {
    const { aboutMe } = usePage().props;
    const [content, setContent] = useState(aboutMe.profile || "");
    const [language, setLanguage] = useState(aboutMe.language || "");

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim() || !language) {
            alert("Profile content and language are required.");
            return;
        }

        try {
            await axios.put(`/admin/about-me/${aboutMe.id}`, {
                profile: content,
                language: language,
            });
            alert("Profile updated successfully!");
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errors = Object.values(error.response.data.errors).flat().join(", ");
                alert("Validation error(s): " + errors);
            } else {
                console.error("Error submitting form:", error);
                alert("There was an error updating the profile.");
            }
        }
    };

    return (
        <div className="content-edit">
            <h2>Edit About Me</h2>
            <form onSubmit={handleSubmit}>
                <SelectOption onChange={handleLanguageChange} value={language} />
                <EditorText content={content} handleEditorChange={handleEditorChange} />
                <input className="btn-primary" type="submit" value="Update" />
            </form>
        </div>
    );
};

AboutMeEdit.layout = (page) => <AdminLayout children={page} />;

export default AboutMeEdit;
