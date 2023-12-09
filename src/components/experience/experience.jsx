import { ExperienceStyle } from "./experienceStyle";

export default function Experience() {
  return (
    <ExperienceStyle>
      <h2>Experience</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="timeline-content">
            <h3>Company Name</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          </div>
        </div>
      </div>
    </ExperienceStyle>
  );
}
