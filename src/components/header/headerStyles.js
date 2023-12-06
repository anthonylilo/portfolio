import styled from 'styled-components'
import imageBackground from '../../Assets/Images/fondo-header.webp'

export const HeaderStyles = styled.header `
  background-image: url(${imageBackground});
  background-repeat: no-repeat;
  background-position: 100% 100%;
  color: #fff;
  height: 70vh;

  .container{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  h1{
    font-size: 3rem;
  }

  h3{
    font-size: 1.5rem;
  }
  
  .btn-primary{
    background-color: #fff;
    color: #000;
    text-decoration: none;
    padding: 10px 40px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1.2rem;
  }

`
