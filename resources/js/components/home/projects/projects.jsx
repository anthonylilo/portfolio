import { ProjectsStyle } from './projectsStyle'
import { TbWorldSearch } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { usePage } from '@inertiajs/inertia-react';

export default function Projects() {
    const { props } = usePage();
    const BASE_URL = props.base_url || '';

    return (
        <ProjectsStyle>
            <h2>Projects</h2>
            <div className='container'>
                <div className='container__filter'>
                    <label>Filter by:</label>
                    <select className='select'>
                        <option value="All">All</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Fullstack">Fullstack</option>
                    </select>
                </div>
                <div className='container__projects'>
                    <div className='card'>
                        <img src={`${BASE_URL}images/profile.png`} alt="project" />
                        <h3>Project Name</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        <h4>Made with:</h4>
                        <div className='card__technologies'>
                            <label>React</label>
                            <label>Node</label>
                            <label>Express</label>
                        </div>
                        <div className='card__links'>
                            <p><a href="#">See Online <TbWorldSearch /></a></p>
                            <p><a href="#">Go to <FaGithub /></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </ProjectsStyle>
    )
}
