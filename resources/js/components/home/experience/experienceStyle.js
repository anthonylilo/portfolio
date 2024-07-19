import styled from "styled-components";

export const ExperienceStyle = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2%;
  padding: 2%;
  height: 28rem;

  h2{
    margin-bottom: 4%;
  }

  .experience__timeline {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .experience__item {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 10rem;
    gap: 0.5rem;
    color: #000;
    background-color: #fff;
    padding: 4px;
    border-radius: 0.7rem;
  }
  .experience__item--right {
    left: 0.8rem;
    position: relative;
  }
  .experience__item--left {
    right: 11rem;
    position: relative;
  }
  .experience__item--right::after,
  .experience__item--left::after {
    content: "";
    position: absolute;
    top: 50%;
    bottom: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #fff;
  }
  .experience__item--right::after {
    right: 100%;
  }
  .experience__item--left::after {
    left: 100%;
  }
  .experience__itemLink:hover {
    cursor: pointer;
    text-decoration: underline;
    color: rgba(0, 0, 0, 0.6);
  }
  .experience__stick {
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    width: 5px;
    height: 100%;
    background-color: #000;
    border-radius: 0.7rem;
  }

  @media (min-width: 900px) {
    height: 40rem;

    .experience__title {
      font-size: 3.5rem;
    }
    .experience__item {
      width: 250px;
      height: 150px;
      padding: 15px;
      font-size: 1.5rem;
    }
    .experience__item--right {
      left: 85px;
    }
    .experience__item--right::after {
      right: 120%;
    }
    .experience__item--left::after {
      left: 120%;
    }
    .experience__item--left {
      right: 22rem;
      bottom: 0%;
    }

    .experience__item--right::after,
    .experience__item--left::after {
      width: 25px;
      height: 25px;
    }
    .experience__stick {
      width: 15px;
    }
  }
`;
