import styled from "styled-components";

export const FooterStyle = styled.footer`
  background-color: #fff;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .footer__logo {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 3px;
  }

  .footer__social svg{
    font-size: 25px;
  }

  @media (min-width: 900px) {
    .footer__logo {
      font-size: 25px;
    }

    .footer__social svg{
      font-size: 30px;
    }
  }
`;
