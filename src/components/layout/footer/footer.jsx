import { FooterStyle } from "./footerStyle";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <FooterStyle>
      <span className="footer__logo">Anthonylilo</span>
      <span className="footer__social">
        <FaInstagram /> <FaGithub /> <FaLinkedin />
      </span>
    </FooterStyle>
  );
}
