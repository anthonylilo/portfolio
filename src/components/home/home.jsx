/* eslint-disable react/no-unescaped-entities */
import { Container, Row, Col, Button } from 'react-bootstrap'
import Profile from '../../assets/images/profile.png'

export default function Home () {
  return (
    <Container className='mt-2'>
      <Row fluid="lg">
        <Col lg={6}>
          <h3>Hi, I'm Anthony</h3>
          <h1>Web developer</h1>
          <Button className='mx-auto p-2' variant='primary'>Cv</Button>
          <Button className='mx-auto p-2' variant='info'>Contact me</Button>
        </Col>
        <Col lg={6}><img src={Profile}/></Col>
      </Row>
    </Container>
  )
}
