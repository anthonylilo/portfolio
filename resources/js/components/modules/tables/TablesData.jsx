import React, { useState, useEffect } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

const TablesData = ({ tableUpdated }) => {  // Recibe la prop 'tableUpdated'
    const [aboutMeData, setAboutMeData] = useState([]);

    const fetchAboutMeData = async () => {
        try {
            const response = await axios.get("/admin/about-me/data");
            setAboutMeData([response.data]);  // Aseguramos que se actualice con los datos nuevos
        } catch (error) {
            console.error("Error fetching about me data:", error);
        }
    };

    // Usamos useEffect para volver a cargar los datos cuando 'tableUpdated' cambie
    useEffect(() => {
        fetchAboutMeData();
    }, [tableUpdated]);  // Dependencia en 'tableUpdated'

    // Manejar la eliminación de un registro
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this profile?")) {
            axios.delete(`/admin/about-me/delete/${id}`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                }
            })
                .then(response => {
                    fetchAboutMeData();  // Volver a cargar los datos después de la eliminación
                })
                .catch(error => {
                    console.error("Error deleting record:", error);
                    alert("There was an error deleting the profile.");
                });
        }
    };

    // Manejar la edición de un registro (redireccionar al formulario de edición)
    const handleEdit = (id) => {
        Inertia.visit(`/admin/about-me/edit/${id}`);
    };

    console.log(aboutMeData);

    return (
        <>
            {aboutMeData.length > 0 && aboutMeData[0].id ? (
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Language</th>
                            <th>Content</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aboutMeData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.language}</td>
                                <td dangerouslySetInnerHTML={{ __html: data.profile }}></td>
                                <td>{data.updated_at}</td>
                                <td>
                                    <button onClick={() => handleEdit(data.id)}>Edit</button>
                                    <button onClick={() => {
                                        console.log(`Deleting profile with ID: ${data.id}`);
                                        handleDelete(data.id);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            ) : (
                <p>No data.</p>
            )}
        </>
    );
};

export default TablesData;
