import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import ExperienceItemModal from "./modal/experienceItemModal";
import { EXPERIENCES } from "../../../constants/experiences";
import { ExperienceStyle } from "./experienceStyle";

const Experience = () => {
  const modalRef = useRef(null);
  const [experience, setExperience] = useState(EXPERIENCES[0]);

  const openModal = (experience) => {
    setExperience(experience);
    modalRef.current?.showModal();
    document.body.style.overflowY = "hidden";
  };

  const closeModal = () => {
    modalRef.current?.close();
    document.body.style.overflowY = "scroll";
  };

  const closeModalOutside = (e) => {
    const dialogDimensions = modalRef.current?.getBoundingClientRect();

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  };

  return (
    <ExperienceStyle className="experience" id="Experience">
      <h2 className="section__title">Experience</h2>
      <div className="experience__timeline">
        <div className="experience__stick">
          {EXPERIENCES.map((experience, i) => (
            <div
              className={`experience__item experience__item--${
                i % 2 === 0 ? "left" : "right"
              }`}
              key={i}
            >
              <h3>{experience.company}</h3>
              <p>{experience.period}</p>
              <p
                className="experience__itemLink"
                onClick={() => {
                  openModal(experience);
                }}
              >
                View More <FaSearch />
              </p>
            </div>
          ))}
        </div>
      </div>
      <ExperienceItemModal
        closeModal={closeModal}
        closeModalOutside={closeModalOutside}
        experience={experience}
        ref={modalRef}
      />
    </ExperienceStyle>
  );
};

export default Experience;
