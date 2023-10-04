import { Container } from 'react-bootstrap'
import { AboutStyles } from './AboutStyle'

export default function About (){
  return (
    <AboutStyles className='text-center'>
      <Container fluid="fluid">
        <h1>About me</h1>
        <h3>What do you want to know? <strong>My skills, my experience, hired me</strong></h3>
        <a className='btn btn-primary' href='#'>Skills</a>
        <a className='btn btn-primary' href='#'>Experience</a>
        <a className='btn btn-primary' href='#'>Hired me</a>
        <h1>Skills no se si ocultar</h1>
      </Container>
    </AboutStyles>
  )
}