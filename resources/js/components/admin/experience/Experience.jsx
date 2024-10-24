import React, { useState, useCallback } from "react";
import axios from "axios";
import AdminLayout from "../../../Pages/admin/Admin";
import SelectOption from '../../modules/selectOption/SelectOption';
import EditorText from "../../modules/textEditor/Editor";
import Input from "../../modules/inputModule/InputModule";
import TablesData from "../../modules/tables/TablesData";

const Experience = () => {
    const [formData, setFormData] = useState({
        language: "",
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        image: null,
        description: ""
    });
    const [experienceData, setExperienceData] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validaciones para contenido y lenguaje
        if (!formData.description.trim() || !formData.language) {
            alert("Description and language are required.");
            return;
        }

        try {
            const data = new FormData();
            data.append("language", formData.language);
            data.append("company", formData.company);
            data.append("position", formData.position);
            data.append("start_date", formData.startDate);
            data.append("end_date", formData.endDate);
            data.append("description", formData.description);
            if (formData.image) {
                data.append("image", formData.image);
            }

            // Realizar la solicitud POST con axios usando FormData
            await axios.post("/admin/experience/post", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Profile created successfully!");

            // Reiniciar el formulario
            setFormData({
                language: "",
                position: "",
                company: "",
                startDate: "",
                endDate: "",
                image: null,
                description: ""
            });
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

    // Placeholder function for fetching data
    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("/admin/experience/data");
            setExperienceData(response.data);
        } catch (error) {
            console.error("Error fetching about me data:", error);
        }
    }, []);

    // Placeholder function for deleting data
    const handleDelete = (id) => {
        console.log(`Deleting item with id: ${id}`);
    };

    // Placeholder function for editing data
    const handleEdit = (id) => {
        console.log(`Editing item with id: ${id}`);
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
                <Input
                    labelText="Image"
                    type="file"
                    name="image"
                    handleChange={(event) => handleInputChange(event, 'image')}
                />
                <EditorText
                    content={formData.description}
                    handleEditorChange={(newContent) => handleInputChange(newContent, 'description')}
                />

                <input className="btn-primary" type="submit" value="Submit" />
            </form>

            <TablesData
                data={experienceData}
                fetchData={fetchData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
};

Experience.layout = (page) => <AdminLayout children={page} />;

export default Experience;
