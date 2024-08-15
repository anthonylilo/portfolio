import React from "react";
import "../../../assets/css/main.css";
import "../../../assets/css/admin.css";
import SideBar from "../../components/admin/sidebar/sidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="container">
            <SideBar />
            <div className="content">{children}</div>
        </div>
    );
};

export default AdminLayout;
