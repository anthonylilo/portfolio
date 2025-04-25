import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "../../../Pages/admin/Admin";
import SelectOption from '../../modules/selectOption/SelectOption';
import EditorText from "../../modules/textEditor/Editor";
import Input from "../../modules/inputModule/InputModule";
import { usePage } from "@inertiajs/inertia-react";

const ExperienceEdit = () => {
    const { experienceData } = usePage().props;
    const baseUrl = `${window.location.origin}/storage/`;
    const [formData, setFormData] = useState({
        language: experienceData.language,
        position: experienceData.position,
        company: experienceData.company,
        startDate: experienceData.start_date,
        endDate: experienceData.end_date,
        image: experienceData.image ? `${baseUrl}${experienceData.image}` : null,
        description: experienceData.description
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validaciones locales
        if (!formData.language.trim() || !formData.position.trim() || !formData.company.trim()) {
            alert("Language, position, and company are required.");
            return;
        }

        try {
            const data = new FormData();
            data.append("language", formData.language.trim());
            data.append("company", formData.company.trim());
            data.append("position", formData.position.trim());
            data.append("start_date", formData.startDate.trim());
            data.append("end_date", formData.endDate?.trim() || "");
            data.append("description", formData.description.trim());

            // Adjuntar archivo solo si es un nuevo archivo
            if (formData.image instanceof File) {
                data.append("image", formData.image);
            }

            // Enviar solicitud PUT
            data.append('_method', 'PUT');

            await axios.post(`/admin/experience/${experienceData.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            alert("Profile updated successfully!");
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat().join(", ");
                alert("Validation error(s): " + errors);
            } else {
                console.error("Error submitting form:", error);
                alert("There was an error updating the experience.");
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

    return (
        <div className="content-edit">
            <h1>Edit Experience</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <SelectOption
                    onChange={(event) => handleInputChange(event, 'language')}
                    value={formData.language}
                />
                <Input
                    labelText="Position"
                    type="text"
                    name="position"
                    value={formData.position}
                    handleChange={(event) => handleInputChange(event, 'position')}
                />
                <Input
                    labelText="Company"
                    type="text"
                    name="company"
                    value={formData.company}
                    handleChange={(event) => handleInputChange(event, 'company')}
                />
                <Input
                    labelText="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    handleChange={(event) => handleInputChange(event, 'startDate')}
                />
                <Input
                    labelText="End Date"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    handleChange={(event) => handleInputChange(event, 'endDate')}
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
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    handleChange={(event) => handleInputChange(event, 'image')}
                />
                <EditorText
                    content={formData.description}
                    handleEditorChange={(newContent) => handleInputChange(newContent, 'description')}
                />

                <input className="btn-primary" type="submit" value="Submit" />
            </form>
        </div>
    );
};

ExperienceEdit.layout = (page) => <AdminLayout children={page} />;

export default ExperienceEdit;
