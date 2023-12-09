import styled from "styled-components";
import imageBackground from "../../Assets/Images/fondo-header.webp";

export const HeaderStyles = styled.header`
  background-image: url(${imageBackground});
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  color: #fff;
  height: 70vh;

  .container {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  h1 {
    font-size: 3.5rem;
    margin-block-start: 0.35em;
    margin-block-end: 0.35em;
  }

  h2 {
    font-size: 2rem;
    margin-block-start: 0.35em;
    margin-block-end: 0.35em;
  }

  span {
    font-size: 4rem;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
  }

  .btn-primary {
    background-color: #fff;
    color: #000;
    text-decoration: none;
    padding: 10px 40px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 900px) {
    
  }
`;
