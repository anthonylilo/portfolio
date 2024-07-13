import { NavStyles } from "./navStyles";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
function NavBar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <NavStyles>
      <div className="container">
        <span className="navbar-logo">Anthonylilo</span>
        <div className="nav-burger" onClick={handleShowNavbar}>
          <GiHamburgerMenu />
        </div>
      </div>
      <div className={`nav-items  ${showNavbar && 'active'}`}>
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
          EDUTACTION
        </a>
        <a href="#" className="navbar-brand">
          HIRE ME
        </a>
      </div>
    </NavStyles>
  );
}

export default NavBar;
