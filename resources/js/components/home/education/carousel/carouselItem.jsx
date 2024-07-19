import PropTypes from "prop-types";
import "./carouselItem.css";

const CarouselItem = ({
  isActive,
  slideDirection,
  items,
}) => {
  return (
    <div
      className={`carousel__item ${
        isActive
          ? `carousel__item--active--${slideDirection}`
          : `carousel__item--hidden--${slideDirection}`
      }`}
      style={{
        backgroundImage: `url(${items.src})`,
      }}
    >
      <div className="carousel__itemShade">
        <h2 className="carousel__itemTitle">{items.title}</h2>
        <h3 className="carousel__itemSubtitle">{items.grade}</h3>
        <p className="carousel__itemPeriod">{items.period}</p>
        {items.certificate && (
          <a
            href={items.certificate}
            target="_blank"
            rel="noreferrer"
            className="carousel__itemLink"
          >
            See Certificate
          </a>
        )}
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  slideDirection: PropTypes.oneOf(["left", "right"]).isRequired,
  items: PropTypes.shape({
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    certificate: PropTypes.string,
  }).isRequired,
};

export default CarouselItem;