import styled from 'styled-components'

export const NavStyles = styled.nav`
  background-color: #fff;
  color: #000;
  position: fixed;
  height: 4rem;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  .navbar-logo{
    font-weight: 700;
    font-size: 2em;
    letter-spacing: 3px;
    margin: 1%;
  }

  .nav-items{
    margin: 1%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-items>a{
    color: #000;
    text-decoration: none;
    font-size: 1.3em;
    margin: 0 0.4em;
  }
  
`
