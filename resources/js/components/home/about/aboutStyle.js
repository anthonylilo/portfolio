import styled from 'styled-components'

export const AboutStyles = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2%;
  padding: 2%;

  p{
    font-size: 1.5rem;
  }

  @media screen and (max-width: 900px) {
    margin: 3%;
    padding: 3%;
    text-align: justify;
    
    p{
      font-size: 1.3rem;
    }
  }
`
