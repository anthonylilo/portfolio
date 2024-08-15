import React from "react";
import AdminLayout from "../../../Pages/admin/Admin";

const ProjectsEdit = () => {
    return (
        <div style={{ padding: "2%" }}>
            <h1>Edit Projects</h1>
            <p>Edit Projects</p>
        </div>
    );
};

ProjectsEdit.layout = (page) => <AdminLayout children={page} />;

export default ProjectsEdit;
