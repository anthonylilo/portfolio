import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavStyles } from "./navStyles";

function NavBar() {
    const [showNavbar, setShowNavbar] = useState(false);
    const [scroll, setScroll] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const handleScroll = () => {
        if (window.scrollY > 80) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <NavStyles className={scroll ? "visible" : ""}>
            <div className="container">
                <span className="navbar-logo">Anthonylilo</span>
                <div className="nav-burger" onClick={handleShowNavbar}>
                    <GiHamburgerMenu />
                </div>
            </div>
            <div className={`nav-items ${showNavbar && "active"}`}>
                <a href="#" className="navbar-brand">
                    HOME
                </a>
                <a href="#" className="navbar-brand">
                    ABOUT ME
                </a>
                <a href="#" className="navbar-brand">
                    EXPERIENCE
                </a>
                <a href="#" className="navbar-brand">
                    PROJECTS
                </a>
                <a href="#" className="navbar-brand">
                    EDUCATION
                </a>
                <a href="#" className="navbar-brand">
                    HIRE ME
                </a>
            </div>
        </NavStyles>
    );
}

export default NavBar;
