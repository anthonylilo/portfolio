import React, { useState, useEffect } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

const TablesData = ({ updateCount }) => {
    const [aboutMeData, setAboutMeData] = useState([]);

    const fetchAboutMeData = async () => {
        try {
            const response = await axios.get("/admin/about-me/data");
            setAboutMeData(response.data);
        } catch (error) {
            console.error("Error fetching about me data:", error);
        }
    };

    useEffect(() => {
        fetchAboutMeData();
    }, [updateCount]);

    //Delete the data
    const handleDelete = (id) => {
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
    };

    //Edit the data
    const handleEdit = (id) => {
        Inertia.visit(`/admin/about-me/edit/${id}`);
    };

    console.log(aboutMeData);

    return (
        <>
            {aboutMeData.length > 0 ? (
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
                                    <button onClick={() => handleDelete(data.id)}>Delete</button>
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
