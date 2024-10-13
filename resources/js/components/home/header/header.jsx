/* eslint-disable react/no-unescaped-entities */
import { HeaderStyles } from "./headerStyles";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Header() {
  return (
    <HeaderStyles className="text-center">
      <div className="container">
        <h1>Backend Developer</h1>
        <h2>Si, soy de esos que hacen un portafolio.</h2>
        <span>
          <FaInstagram /> <FaGithub /> <FaLinkedin />
        </span>
        <a className="btn-primary" href="#">Download cv</a>
      </div>
    </HeaderStyles>
  );
}
