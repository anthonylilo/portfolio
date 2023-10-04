import {ExperienceStyle} from './ExperienceStyle'
import {Button, Card, Container} from 'react-bootstrap'
import Profile from '../../Assets/Images/Profile.png'

export default function Experience() {
    return (
        <ExperienceStyle className='text-center'>
            <Container fluid="fluid">
                <h1>Experience</h1>
                <Card style={{
                        width: '18rem'
                    }}>
                    <Card.Img variant="top" src={Profile}/>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text.
                        </Card.Text>
                        <Button variant="primary">Wea con la que trabaje</Button>
                    </Card.Body>
                </Card>
            </Container>
        </ExperienceStyle>
    )
}