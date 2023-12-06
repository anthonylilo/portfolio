import {ExperienceStyle} from './ExperienceStyle'
import Profile from '../../Assets/Images/Profile.png'

export default function Experience() {
    return (
        <ExperienceStyle className='text-center'>
                <h1>Experience</h1>
                <img src={Profile} alt="Profile" className='rounded-circle' width="150px" height="150px" />
        </ExperienceStyle>
    )
}