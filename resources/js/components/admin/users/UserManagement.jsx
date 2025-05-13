import React, { useState, useCallback } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "../../../Pages/admin/Admin";
import TablesData from "../../layouts/tables/TablesData";

const UserManagement = () => {
    const [userData, setUserData] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "guest",
        status: "active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
            alert("Name, email, and password are required.");
            return;
        }

        try {
            await axios.post("/admin/users/post", form);
            alert("User created successfully!");
            setForm({
                name: "",
                email: "",
                password: "",
                role: "guest",
                status: "active",
            });
            fetchUserData();
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat().join(", ");
                alert("Validation error(s): " + errors);
            } else {
                console.error("Error creating user:", error);
                alert("There was an error creating the user.");
            }
        }
    };

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get("/admin/users/data");
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, []);

    const handleDelete = useCallback((id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            axios.delete(`/admin/users/delete/${id}`)
                .then(() => {
                    alert("User deleted successfully!");
                    fetchUserData();
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                    alert("There was an error deleting the user.");
                });
        }
    }, [fetchUserData]);

    const handleEdit = (id) => {
        Inertia.visit(`/admin/users/edit/${id}`);
    };

    return (
        <div className="content-edit">
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="guest">Guest</option>
                </select>
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <input className="btn-primary" type="submit" value="Submit" />
            </form>

            <TablesData
                data={userData}
                fetchData={fetchUserData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
};

UserManagement.layout = (page) => <AdminLayout children={page} />;

export default UserManagement;
