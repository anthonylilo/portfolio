import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "../../../Pages/admin/Admin";
import SelectOption from "../../modules/selectOption/SelectOption";
import Input from "../../modules/inputModule/InputModule";
import { usePage } from "@inertiajs/inertia-react";

const EducationEdit = () => {
    const { educationData, programmingLanguageOptions, categoryOptions } = usePage().props;
    const baseUrl = `${window.location.origin}/storage/`;
    const [formData, setFormData] = useState({
        provider: educationData.provider || "",
        title_course: educationData.title_course || "",
        link: educationData.link || "",
        language: educationData.language || "",
        startDate: educationData.start_date || "",
        endDate: educationData.end_date || "",
        programming_languages: educationData.programming_languages?.map(id => id) || [],
        categories: educationData.categories?.map(id => id) || [],
        image: educationData.image ? `${baseUrl}${educationData.image}` : null,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = new FormData();
            data.append("provider", formData.provider);
            data.append("title_course", formData.title_course);
            data.append("link", formData.link);
            data.append("language", formData.language);
            data.append("start_date", formData.startDate);
            data.append("end_date", formData.endDate);
            data.append("programming_languages", JSON.stringify(formData.programming_languages));
            data.append("categories", JSON.stringify(formData.categories));
            if (formData.image instanceof File) {
                data.append("image", formData.image);
            }
            data.append("_method", "PUT");

            await axios.post(`/admin/education/${educationData.id}`, data);

            alert("Education updated successfully!");
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat().join(", ");
                alert("Validation error(s): " + errors);
            } else {
                console.error("Error submitting form:", error);
                alert("There was an error updating the education.");
            }
        }
    };

    const handleInputChange = (event, name) => {
        const value = event && event.target
            ? (event.target.files ? event.target.files[0] : event.target.value)
            : event;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleMultiSelectChange = (selectedIds, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedIds,
        }));
    };

    return (
        <div className="content-edit">
            <h1>Edit Education</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <SelectOption
                    onChange={(event) => handleInputChange(event, "language")}
                    value={formData.language}
                />
                <Input
                    labelText="Provider"
                    type="text"
                    name="provider"
                    value={formData.provider}
                    handleChange={(e) => handleInputChange(e, "provider")}
                />
                <Input
                    labelText="Title Course"
                    type="text"
                    name="title_course"
                    value={formData.title_course}
                    handleChange={(e) => handleInputChange(e, "title_course")}
                />
                <Input
                    labelText="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    handleChange={(e) => handleInputChange(e, "startDate")}
                />
                <Input
                    labelText="End Date"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    handleChange={(e) => handleInputChange(e, "endDate")}
                />
                <Input
                    labelText="Certificate Link"
                    type="text"
                    name="link"
                    value={formData.link}
                    handleChange={(e) => handleInputChange(e, "link")}
                />
                {formData.image && (
                    <div className="image-preview">
                        <img
                            src={
                                formData.image instanceof File
                                    ? URL.createObjectURL(formData.image)
                                    : formData.image
                            }
                            alt="Experience"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    </div>
                )}

                <Input
                    labelText="Image"
                    type="file"
                    name="image"
                    handleChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                            handleInputChange(event, 'image');
                        }
                    }}
                />

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

                <input className="btn-primary" type="submit" value="Submit" />
            </form>
        </div>
    );
};

EducationEdit.layout = (page) => <AdminLayout children={page} />;

export default EducationEdit;
