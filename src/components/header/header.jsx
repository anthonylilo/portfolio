/* eslint-disable react/no-unescaped-entities */
import {Row, Col, Container} from 'react-bootstrap'
import {HeaderStyles} from './HeaderStyles'
export default function Header() {
    return (
        <HeaderStyles className='text-center'>
            <Container fluid="fluid">
                <Row
                    className='d-flex align-content-center justify-content-lg-center'
                    fluid="lg">
                    <Col className='text-header' lg={12}>
                        <h3>Anthonylilo.</h3>
                        <h1>Web developer</h1>
                        <h3>Si, soy de esos que realizan un portafolio</h3>
                    </Col>
                </Row>
            </Container>
        </HeaderStyles>
    )
}
