import React from "react";
import AdminLayout from "../../../Pages/admin/Admin";

const EducationEdit = () => {
    return (
        <div style={{ padding: "2%" }}>
            <h1>Edit Education</h1>
            <p>Edit Education</p>
        </div>
    );
};

EducationEdit.layout = (page) => <AdminLayout children={page} />;

export default EducationEdit;
