import React from "react";
import AdminLayout from "../../../Pages/admin/Admin";

const HireMeEdit = () => {
    return (
        <div style={{ padding: "2%" }}>
            <h1>Edit Hire me</h1>
            <p>Edit Hire me</p>
        </div>
    );
};

HireMeEdit.layout = (page) => <AdminLayout children={page} />;

export default HireMeEdit;
