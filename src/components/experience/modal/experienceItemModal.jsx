import { forwardRef } from "react";
import "./experienceItemStyle.css";
import PropTypes from "prop-types";

function ExperienceItemModal(props, ref) {
  const { closeModal, closeModalOutside, experience } = props;

  const handleDialogClick = (e) => {
    closeModalOutside(e.nativeEvent);
  };

  return (
    <dialog
      className="experienceItemModal"
      ref={ref}
      onClick={handleDialogClick}
    >
      <div className="experienceItemModal__header">
        <h2 className="experienceItemModal__title">{experience.company}</h2>
        <h4>{experience.position}</h4>
        <p className="experienceItemModal__date">{experience.period}</p>
      </div>
      <div className="experienceItemModal__body">
        <ul className="experienceItemModal__list">
          {experience.bullets.map((bullet, i) => (
            <li className="experienceItemModal__listItem" key={i}>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <div className="experienceItemModal__footer">
        <button className="experienceItemModal__button" onClick={closeModal}>
          Close
        </button>
      </div>
    </dialog>
  );
}

ExperienceItemModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  closeModalOutside: PropTypes.func.isRequired,
  experience: PropTypes.object.isRequired,
};

const NamedExperienceItemModal = forwardRef(ExperienceItemModal);
export default NamedExperienceItemModal;
