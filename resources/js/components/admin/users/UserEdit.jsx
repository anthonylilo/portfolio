import React, { useState } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/inertia-react";
import AdminLayout from "../../../Pages/admin/Admin";

const UserEdit = () => {
    const { user } = usePage().props;

    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/admin/users/${user.id}`, form);
            alert("User updated successfully!");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("There was an error updating the user.");
        }
    };

    return (
        <div className="content-edit">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={form.name} onChange={handleChange} />
                <input type="email" name="email" value={form.email} onChange={handleChange} />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="guest">Guest</option>
                </select>
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <input className="btn-primary" type="submit" value="Update" />
            </form>
        </div>
    );
};

UserEdit.layout = (page) => <AdminLayout children={page} />;

export default UserEdit;
