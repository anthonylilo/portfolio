import styled from "styled-components";

export const ExperienceStyle = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2%;
  padding: 2%;

  .timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .timeline::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: #333;
    left: 50%;
    margin-left: -1px;
    top: 0;
    z-index: -1;
  }

  .timeline-item {
    position: relative;
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
    margin: 10px 0;
    text-align: center;
    color: #333;
    
  }
`;
