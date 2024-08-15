import React from "react";
import AdminLayout from "../../../Pages/admin/Admin";

const ExperienceEdit = () => {
    return (
        <div style={{ padding: "2%" }}>
            <h1>Edit Experience</h1>
            <p>Edit Experience</p>
        </div>
    );
};

ExperienceEdit.layout = (page) => <AdminLayout children={page} />;

export default ExperienceEdit;
