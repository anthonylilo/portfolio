import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../Pages/admin/Admin";
import SelectOption from "../../modules/selectOption/SelectOption";
import Input from "../../modules/inputModule/InputModule";
import TablesData from "../../modules/tables/TablesData";
import { Inertia } from "@inertiajs/inertia";

const Education = () => {
    const [formData, setFormData] = useState({
        provider: "",
        title_course: "",
        link: "",
        programming_languages: [],
        categories: [],
        language: "",
        image: null,
        startDate: "",
        endDate: ""
    });

    const [educationData, setEducationData] = useState([]);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.language || !formData.title_course.trim() || !formData.provider.trim()) {
            alert("Provider, name, language and description are required.");
            return;
        }

        try {
            const data = new FormData();
            data.append("provider", formData.provider);
            data.append("title_course", formData.title_course);
            data.append("language", formData.language);
            data.append("link", formData.link);
            data.append("programming_languages", JSON.stringify(formData.programming_languages));
            data.append("categories", JSON.stringify(formData.categories));
            data.append("start_date", formData.startDate);
            data.append("end_date", formData.endDate);
            if (formData.image) {
                data.append("image", formData.image);
            }

            await axios.post("/admin/education/post", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Education created successfully!");

            setFormData({
                name: "",
                links: [""],
                programming_languages: [],
                categories: [],
                language: "",
                image: null,
                startDate: "",
                endDate: ""
            });

            fetchData();
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat().join(", ");
                alert("Validation error(s): " + errors);
            } else {
                console.error("Error submitting form:", error);
                alert("There was an error creating the education.");
            }
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("/admin/education/data");
            setEducationData(response.data);
        } catch (error) {
            console.error("Error fetching education:", error);
        }
    }, []);

    const handleDelete = useCallback((id) => {
        if (confirm("Are you sure you want to delete this entry?")) {
            axios.delete(`/admin/education/delete/${id}`)
                .then(() => {
                    alert("Education deleted successfully!");
                    fetchData();
                })
                .catch((error) => {
                    console.error("Error deleting education:", error);
                    alert("There was an error deleting the education.");
                });
        }
    }, [fetchData]);

    const handleEdit = (id) => {
        Inertia.visit(`/admin/education/edit/${id}`);
    };

    return (
        <div className="content-edit">
            <h1>Create Education</h1>
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
                    labelText="Image"
                    type="file"
                    name="image"
                    handleChange={(e) => handleInputChange(e, "image")}
                />

                <Input
                    labelText="Certificate Link"
                    type="text"
                    name="link"
                    value={formData.link}
                    handleChange={(e) => handleInputChange(e, "link")}
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

            <TablesData
                data={educationData}
                fetchData={fetchData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
};

Education.layout = (page) => <AdminLayout children={page} />;

export default Education;
