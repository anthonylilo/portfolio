import React from "react";
import AdminLayout from "../../../Pages/admin/Admin";

const AboutMeEdit = () => {
    return (
        <div style={{ padding: "2%" }}>
            <h1>Edit About Me</h1>
            <p>Edit About Me</p>
        </div>
    );
};

AboutMeEdit.layout = (page) => <AdminLayout children={page} />;

export default AboutMeEdit;
