import { SideBarStyles } from "./styleSideBar";

function SideBar() {
    return (
        <SideBarStyles>
            <div className="sidebar-logo">
                <h1>Anthony Lilo</h1>
            </div>
            <hr />
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About Me</a>
                </li>
                <li>
                    <a href="#">Experience</a>
                </li>
                <li>
                    <a href="#">Projects</a>
                </li>
                <li>
                    <a href="#">Education</a>
                </li>
                <li>
                    <a href="#">Hire Me</a>
                </li>
            </ul>
        </SideBarStyles>
    );
}

export default SideBar;
