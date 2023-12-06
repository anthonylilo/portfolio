/* eslint-disable react/no-unescaped-entities */
import { HeaderStyles } from "./HeaderStyles";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Header() {
  return (
    <HeaderStyles className="text-center">
      <div className="container">
        <h1>Web Developer</h1>
        <h2>Si, soy de esos que hacen un portafolio.</h2>
        <h3>
          <FaInstagram /> <FaGithub /> <FaLinkedin />
        </h3>
        <a className="btn-primary" href="#">Experience</a>
      </div>
    </HeaderStyles>
  );
}
