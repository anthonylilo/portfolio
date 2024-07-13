import styled from "styled-components";

export const NavStyles = styled.nav`
  background-color: #fff;
  color: #000;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 2;
  height: 4rem;
  width: 100%;
  top: 0;
  left: 0;
  font-weight: bold;

  .container {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .navbar-logo {
    font-weight: 700;
    font-size: 2em;
    letter-spacing: 3px;
    margin: 1%;
  }

  .nav-burger {
    font-size: 22px;
    padding: 1%;
    display: none;
  }

  .nav-items {
    margin: 1%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-items > a {
    color: #000;
    text-decoration: none;
    font-size: 1.3em;
    margin: 0 0.4em;
  }

  @media screen and (max-width: 900px) {
    .navbar-logo {
      font-size: 1.5em;
      margin: 2%;
    }

    .nav-items {
      position: absolute;
      top: 100%;
      left: 0;
      margin: 0%;
      width: 100%;
      height: 220px;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      background-color: #fff;
      display: none;
    }

    .nav-items.active{
      display: flex;
      transition: ease-in-out 0.3s;
    }

    .container:hover .nav-items {
      display: flex;
    }

    .nav-burger {
      cursor: pointer;
      display: flex;
      margin: 5%;
    }
  }
`;
