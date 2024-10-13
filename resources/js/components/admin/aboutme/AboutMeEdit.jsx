import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Pages/admin/Admin";
import { Editor } from "@tinymce/tinymce-react";
import TablesData from "../../modules/tables/TablesData";
import SelectOption from "../../modules/selectOption/SelectOption";
import axios from "axios";

const AboutMeEdit = () => {
    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("");
    const [tableUpdated, setTableUpdated] = useState(false); // Estado para actualizar la tabla

    const fetchProfile = async () => {
        try {
            const response = await axios.get("/admin/about-me/data");
            if (response.data && response.data.profile) {
                setContent(response.data.profile);
                setLanguage(response.data.language);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(content, language);

        if (!content.trim() || !language) {
            alert("Profile content and language are required.");
            return;
        }

        try {
            await axios.post("/admin/about-me/post", {
                profile: content,
                language: language,
            });
            alert("Profile updated successfully!");
            setTableUpdated(!tableUpdated); // Actualiza la tabla cambiando el estado
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
                <SelectOption onChange={handleLanguageChange} />
                <Editor
                    apiKey="q4yu0eqvznbvqzi0or2a52488dzxj1sfmu0bfpnoqiarnrlo"
                    value={content}
                    init={{
                        plugins: "lists",
                        toolbar: "bullist numlist",
                    }}
                    onEditorChange={handleEditorChange}
                />
                <input className="btn-primary" type="submit" value="Submit" />
            </form>
            {/* Pasa el estado 'tableUpdated' como prop a TablesData */}
            <TablesData tableUpdated={tableUpdated} />
        </div>
    );
};

AboutMeEdit.layout = (page) => <AdminLayout children={page} />;

export default AboutMeEdit;
