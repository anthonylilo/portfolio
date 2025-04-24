import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Pages/admin/Admin";
import SelectOption from "../../modules/selectOption/SelectOption";
import EditorText from "../../modules/textEditor/Editor";
import Input from "../../modules/inputModule/InputModule";
import TablesData from "../../modules/tables/TablesData";
import { Inertia } from "@inertiajs/inertia";

const Projects = () => {
    const [formData, setFormData] = useState({
        name: "",
        links: [""],
        programming_languages: [],
        categories: [],
        language: "",
        image: null,
        short_description: "",
    });

    const [projectsData, setProjectsData] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [programmingLanguageOptions, setProgrammingLanguageOptions] = useState([]);

    useEffect(() => {
        fetchData();
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const [categories, languages] = await Promise.all([
                axios.get("/admin/categories"),
                axios.get("/admin/programming-languages")
            ]);
            setCategoryOptions(categories.data);
            setProgrammingLanguageOptions(languages.data);
        } catch (error) {
            console.error("Error loading options:", error);
        }
    };

    const handleInputChange = (event, name) => {
        const value = event?.target
            ? event.target.files
                ? event.target.files[0]
                : event.target.value
            : event;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMultiSelectChange = (selectedIds, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedIds,
        }));
    };

    const handleArrayChange = (value, index, name) => {
        const updated = [...formData[name]];
        updated[index] = value;
        setFormData({ ...formData, [name]: updated });
    };

    const addField = (name) => {
        setFormData((prev) => {
            if (prev[name].length >= 4) {
                alert(`Solo se permiten hasta 4 ${name === "links" ? "links" : name}`);
                return prev;
            }
            return {
                ...prev,
                [name]: [...prev[name], ""]
            };
        });
    };

    const removeField = (name, index) => {
        const updated = [...formData[name]];
        updated.splice(index, 1);
        setFormData({ ...formData, [name]: updated });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.short_description.trim() || !formData.language || !formData.name.trim()) {
            alert("Name, language and description are required.");
            return;
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("language", formData.language);
            data.append("short_description", formData.short_description);
            data.append("links", JSON.stringify(formData.links));
            data.append("programming_languages", JSON.stringify(formData.programming_languages));
            data.append("categories", JSON.stringify(formData.categories));
            if (formData.image) {
                data.append("image", formData.image);
            }

            await axios.post("/admin/projects/post", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Project created successfully!");

            setFormData({
                name: "",
                links: [""],
                programming_languages: [],
                categories: [],
                language: "",
                image: null,
                short_description: "",
            });

            fetchData();
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat().join(", ");
                alert("Validation error(s): " + errors);
            } else {
                console.error("Error submitting form:", error);
                alert("There was an error creating the project.");
            }
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("/admin/projects/data");
            setProjectsData(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, []);

    const handleDelete = useCallback((id) => {
        if (confirm("Are you sure you want to delete this project?")) {
            axios.delete(`/admin/projects/delete/${id}`)
                .then(() => {
                    alert("Project deleted successfully!");
                    fetchData();
                })
                .catch((error) => {
                    console.error("Error deleting project:", error);
                    alert("There was an error deleting the project.");
                });
        }
    }, [fetchData]);

    const handleEdit = (id) => {
        Inertia.visit(`/admin/projects/edit/${id}`);
    };

    return (
        <div className="content-edit">
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <SelectOption
                    onChange={(event) => handleInputChange(event, "language")}
                    value={formData.language}
                />

                <Input
                    labelText="Project Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    handleChange={(e) => handleInputChange(e, "name")}
                />

                <Input
                    labelText="Image"
                    type="file"
                    name="image"
                    handleChange={(event) => handleInputChange(event, "image")}
                />

                <h3>Links</h3>
                {formData.links.map((link, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => handleArrayChange(e.target.value, index, "links")}
                        />
                        {formData.links.length > 1 && (
                            <button type="button" onClick={() => removeField("links", index)}>Eliminar</button>
                        )}
                    </div>
                ))}
                {formData.links.length < 4 && (
                    <button type="button" onClick={() => addField("links")}>Agregar Link</button>
                )}

                <h3>Lenguajes de Programación</h3>
                <select multiple value={formData.programming_languages} onChange={(e) => handleMultiSelectChange([...e.target.selectedOptions].map(opt => parseInt(opt.value)), 'programming_languages')}>
                    {programmingLanguageOptions.map(lang => (
                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                </select>

                <h3>Categorías</h3>
                <select multiple value={formData.categories} onChange={(e) => handleMultiSelectChange([...e.target.selectedOptions].map(opt => parseInt(opt.value)), 'categories')}>
                    {categoryOptions.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <EditorText
                    content={formData.short_description}
                    handleEditorChange={(newContent) => handleInputChange(newContent, "short_description")}
                />

                <input className="btn-primary" type="submit" value="Submit" />
            </form>

            <TablesData
                data={projectsData}
                fetchData={fetchData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
};

Projects.layout = (page) => <AdminLayout children={page} />;

export default Projects;
