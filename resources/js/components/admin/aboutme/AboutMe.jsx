import React, { useState, useCallback } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "../../../Pages/admin/Admin";
import EditorText from "../../modules/textEditor/Editor";
import TablesData from "../../modules/tables/TablesData";
import SelectOption from "../../modules/selectOption/SelectOption";

const AboutMe = () => {
    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("");
    const [updateCount, setUpdateCount] = useState(0);
    const [aboutMeData, setAboutMeData] = useState([]);

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
            alert("Profile created successfully!");
            setContent("");
            setLanguage("");
            setUpdateCount((prevCount) => prevCount + 1);
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errors = Object.values(error.response.data.errors).flat().join(", ");
                alert("Validation error(s): " + errors);
            } else {
                console.error("Error submitting form:", error);
                alert("There was an error creating the profile.");
            }
        }
    };

    const fetchAboutMeData = useCallback(async () => {
        try {
            const response = await axios.get("/admin/about-me/data");
            setAboutMeData(response.data);
        } catch (error) {
            console.error("Error fetching about me data:", error);
        }
    }, []);

    // Función para eliminar un registro
    const handleDelete = useCallback((id) => {
        if (confirm("Are you sure you want to delete this profile?")) {
            axios.delete(`/admin/about-me/delete/${id}`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                }
            })
                .then(response => {
                    fetchAboutMeData();
                })
                .catch(error => {
                    console.error("Error deleting record:", error);
                    alert("There was an error deleting the profile.");
                });
        }
    }, [fetchAboutMeData]);

    // Función para editar
    const handleEdit = (id) => {
        Inertia.visit(`/admin/about-me/edit/${id}`);
    };

    return (
        <div className="content-edit">
            <h2>Create About Me</h2>
            <form onSubmit={handleSubmit}>
                <SelectOption onChange={handleLanguageChange} value={language} />
                <EditorText content={content} handleEditorChange={handleEditorChange} />
                <input className="btn-primary" type="submit" value="Submit" />
            </form>
            <TablesData
                data={aboutMeData}
                fetchData={fetchAboutMeData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
};

AboutMe.layout = (page) => <AdminLayout children={page} />;

export default AboutMe;
