import { SideBarStyles } from "./styleSideBar";
import {
    FaHome,
    FaBook,
    FaCodeBranch,
    FaCode,
    FaFileAlt,
    FaEnvelope,
    FaSignOutAlt,
} from "react-icons/fa";
import { Link, usePage } from "@inertiajs/inertia-react";

function SideBar() {
    const { url } = usePage();
    return (
        <SideBarStyles>
            <div className="sidebar-logo">
                <h1>Anthony Lilo</h1>
            </div>
            <hr />
            <div className="sidebar-links">
                <ul>
                    <li>
                        <Link
                            href="/admin"
                            className={url === "/admin" ? "active" : ""}
                        >
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/about-me"
                            className={url === "/admin/about-me" ? "active" : ""}
                        >
                            <FaBook /> About Me
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/experience"
                            className={url === "/admin/experience" ? "active" : ""}
                        >
                            <FaCodeBranch /> Experience
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/projects"
                            className={url === "/admin/projects" ? "active" : ""}
                        >
                            <FaCode /> Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/education"
                            className={url === "/admin/education" ? "active" : ""}
                        >
                            <FaFileAlt /> Education
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/hire-me"
                            className={url === "/admin/hire-me" ? "active" : ""}
                        >
                            <FaEnvelope /> Hire Me
                        </Link>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="sidebar-footer">
                <Link href="#">
                    <FaSignOutAlt /> Sign Out
                </Link>
            </div>
        </SideBarStyles>
    );
}

export default SideBar;
