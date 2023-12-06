import { NavStyles } from "./NavStyles";
import{GiHamburgerMenu} from 'react-icons/gi'
function NavBar() {
  return (
    <NavStyles>
      <span className="navbar-logo">Anthonylilo</span>
      <div className="nav-burger">
        <GiHamburgerMenu />
      </div>
      <div className="nav-items">
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
