import {NavStyles} from './NavStyles'
import {Container, Nav} from 'react-bootstrap'

function NavBar() {
    return (
        <NavStyles expand="lg">
            <Container fluid="fluid">
                <NavStyles.Brand>
                    <a href="/">Anthonylilo</a>
                </NavStyles.Brand>
                <NavStyles.Toggle className="w-100 m-2" aria-controls="responsive-navbar-nav"/>
                <NavStyles.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <a className='nav-link active' to={'/'}>HOME</a>
                        <a className='nav-link second-color' to={'/'}>ABOUT</a>
                        <a className='nav-link first-color' to={'/'}>EXPERIENCE</a>
                        <a className='nav-link third-color' to={'/'}>CONTACT</a>
                        <a className='nav-link third-color' to={'/'}>EN</a>
                    </Nav>
                </NavStyles.Collapse>
            </Container>
        </NavStyles>
    )
}

export default NavBar
