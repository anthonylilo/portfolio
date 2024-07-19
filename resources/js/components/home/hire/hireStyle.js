import styled from "styled-components";

export const HireStyle = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2%;
  padding: 2%;

  .container {
    width: 100%;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      label {
        font-size: 20px;
        margin: 5%;
      }
      input {
        width: 100%;
        height: 30px;
        font-size: 15px;
        margin: 1%;
        padding: 1%;
        border: none;
        border-radius: 2rem;
      }
      textarea {
        width: 100%;
        font-size: 15px;
        margin: 1%;
        padding: 1%;
        resize: none;
        height: 100px;
        border: none;
        border-radius: 2rem;
      }
      input[type="submit"] {
        width: 100%;
        height: 30px;
        font-size: 15px;
        margin: 1%;
        padding: 1%;
        background-color: #000;
        color: #fff;
        border: none;
        border-radius: 1rem;
        cursor: pointer;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
        &:hover {
          transition: 0.5s;
          box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
          border: 1px solid #fff;
          border-radius: 1rem;
          padding: 1%;
          background-color: #fff;
          color: #000;
        }
      }
    }
  }

  @media (min-width: 900px) {
    .container form {
      input, textarea, input[type="submit"]{
        width: 50%;
      }
      label{
        margin: 1%
      }
      input[type="submit"]{
        height: 40px;
      }
    }
  }
`;
