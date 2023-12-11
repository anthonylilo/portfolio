import styled from "styled-components";

export const EducationStyle = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .carousel {
    width: 90%;
    height: 25rem;
    border-radius: 10%;
    position: relative;
    overflow: auto;
  }
  .carousel__previous,
  .carousel__next {
    top: 50%;
    bottom: 50%;
    transform: translateY(-50%);
    z-index: 1;
    font-size: 2rem;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0.3rem;
    cursor: pointer;
    position: absolute;
  }
  .carousel__previous {
    left: 10px;
  }
  .carousel__next {
    right: 10px;
  }
  .carousel__itemsContainer {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 768px) {
    .carousel {
      height: 35rem;
    }
    .carousel__previous,
    .carousel__next {
      font-size: 3rem;
      top: 50%;
    }
  }
  @media (min-width: 1024px) {
    .carousel {
      width: 50%;
      height: 60vh;
      border-radius: 2.5rem;
      overflow: hidden;
    }
  }
`;
