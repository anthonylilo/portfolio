import styled from "styled-components";

export const ProjectsStyle = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container {
    width: 100%;
    height: 100%;
  }

  .container__filter {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 1%;
    color: #fff;
    background-color: #000;
    label {
      font-size: 20px;
      margin: 5%;
    }
    .select {
      border-radius: 1rem;
      height: 30px;
      width: 100px;
      font-size: 15px;
    }
  }

  .container__projects {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 5% 0%;
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 260px;
      margin: 1%;
      padding: 1%;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
      img {
        width: 100%;
        height: 200px;
        border-radius: 1rem;
        object-fit: cover;
        object-position: center;
      }
      h3 {
        font-size: 20px;
        margin: 1%;
        color: #000;
      }
      p {
        width: 100%;
        font-size: 15px;
        margin: 1%;
        padding: 1%;
        color: #000;
        text-align: center;
      }
      h4 {
        font-size: 15px;
        margin: 1%;
        color: #000;
        text-align: center;
      }
      .card__technologies {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 1%;
        label {
          font-size: 15px;
          margin: 1%;
          color: #000;
          text-align: center;
          border: 1px solid #000;
          border-radius: 1rem;
          padding: 1%;
          background-color: #fff;
          box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
        }
      }
      .card__links {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 1%;
        a {
          font-size: 15px;
          margin: 1%;
          color: #000;
          text-align: center;
          text-decoration: none;
          border: 1px solid #000;
          border-radius: 1rem;
          padding: 1%;
          background-color: #fff;
          box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
          &:hover {
            background-color: #000;
            color: #fff;
            transition: 0.5s;
            cursor: pointer;
            box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
            border: 1px solid #fff;
            border-radius: 1rem;
            padding: 1%;
          }
        }
      }
    }
  }

  @media (min-width: 900px) {
    .container{
      margin-top: 1%;
    }

    .container__filter {
      height: 70px;
      label{
        font-size: 25px;
        margin: 1%;
      }
      .select{
        width: 200px;
        height: 45px;
        font-size: 20px;
      }
    }

    .container__projects {
      margin: 2% 0%;
      .card {
        width: 300px;
        h3{
          font-size: 25px;
        }
        p, h4{
          font-size: 18px;
        }
        .card__technologies {
          label{
            font-size: 18px;
          }
        }
        .card__links {
          a{
            font-size: 18px;
          }
        }
      }
    }
  }
`;
