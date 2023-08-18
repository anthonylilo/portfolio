import styled from 'styled-components'

export const HomeStyles = styled.header`
  background-color: #090A26;
  color: #fff;
  height: 95vh;

  .container-fluid, .row{
    height: 100%;
  }

  .text-header{
    margin:auto;

    h3{
      font-size: 3rem;
    }
    h1{
      font-size: 5rem;
    }
  }

  .btn{
    color: #fff;
  }

  .cv{
    font-size: 1.8rem;
    padding: 1%;
    width: 32%;
    background-color: #3752A6;
  }

  .contact{
    margin-left: 5%;
    font-size: 1.8rem;
    padding: 1%;
    width: 25%;
    background-color: red;
  }
`
