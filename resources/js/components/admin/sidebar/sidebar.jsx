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
import { Link } from "@inertiajs/inertia-react";

function SideBar() {
    return (
        <SideBarStyles>
            <div className="sidebar-logo">
                <h1>Anthony Lilo</h1>
            </div>
            <hr />
            <div className="sidebar-links">
                <ul>
                    <li>
                        <Link href="/admin">
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/about-me">
                            <FaBook /> About Me
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/experience">
                            <FaCodeBranch /> Experience
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/projects">
                            <FaCode /> Projects
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/education">
                            <FaFileAlt /> Education
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/hire-me">
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
