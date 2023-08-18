/* eslint-disable react/no-unescaped-entities */
import { Row, Col, Container } from 'react-bootstrap'
import Profile from '../../assets/images/profile.png'
import { HomeStyles } from './homeStyles'
import { BsWhatsapp, BsDownload } from 'react-icons/bs'

export default function Home () {
  return (
    <HomeStyles className='text-center'>
      <Container fluid>
        <Row className='d-flex align-content-center justify-content-lg-center' fluid="lg">
          <Col className='text-header' lg={6}>
            <h3>Hi, I'm Anthony Alvarez</h3>
            <h1>Web developer</h1>    
            <a className='btn cv'>Download my cv <span><BsDownload/></span></a>
            <a className='btn contact'>Contact me <span><BsWhatsapp/></span></a>
          </Col>
          <Col lg={6}><img src={Profile}/></Col>
        </Row>
      </Container>
    </HomeStyles>
  )
}
