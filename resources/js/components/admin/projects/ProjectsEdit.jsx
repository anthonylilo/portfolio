import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../Pages/admin/Admin";
import SelectOption from "../../layouts/selectOption/SelectOption";
import EditorText from "../../layouts/textEditor/Editor";
import Input from "../../layouts/inputModule/InputModule";
import { usePage } from "@inertiajs/inertia-react";

const ProjectsEdit = () => {
    const { projectData, programmingLanguageOptions, categoryOptions } = usePage().props;
    const baseUrl = `${window.location.origin}/storage/`;
    const [formData, setFormData] = useState({
        name: projectData.name || "",
        language: projectData.language || "",
        short_description: projectData.short_description || "",
        links: projectData.links || [""],
        programming_languages: projectData.programming_languages?.map(id => id) || [],
        categories: projectData.categories?.map(id => id) || [],
        image: projectData.image ? `${baseUrl}${projectData.image}` : null,
    });

    const handleInputChange = (event, name) => {
        const value = event?.target
            ? event.target.files
                ? event.target.files[0]
                : event.target.value
            : event;

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (value, index, name) => {
        const updated = [...formData[name]];
        updated[index] = value;
        setFormData({ ...formData, [name]: updated });
    };

    const handleMultiSelectChange = (selectedIds, field) => {
        setFormData(prev => ({ ...prev, [field]: selectedIds }));
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

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("language", formData.language);
            data.append("short_description", formData.short_description);
            data.append("links", JSON.stringify(formData.links));
            data.append("programming_languages", JSON.stringify(formData.programming_languages));
            data.append("categories", JSON.stringify(formData.categories));
            if (formData.image instanceof File) {
                data.append("image", formData.image);
            }

            data.append("_method", "PUT");

            await axios.post(`/admin/projects/${projectData.id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Project updated successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error updating the project.");
        }
    };

    return (
        <div className="content-edit">
            <h1>Edit Project</h1>
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
                {formData.image && (
                    <div className="image-preview">
                        <img
                            src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
                            alt="Project"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    </div>
                )}
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
        </div>
    );
};

ProjectsEdit.layout = (page) => <AdminLayout children={page} />;

export default ProjectsEdit;
