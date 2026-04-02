import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import "../css/SlideUp.css";

function SlideUp({ onClick, isScrolled }) {
  return (
    <div
      className={`slide-up-container ${isScrolled ? "scrolled" : ""}`}
      onClick={onClick}
    >
      <div className="icon-stack">
        <FontAwesomeIcon icon={faAnglesUp} className="arrow-main" />
        <FontAwesomeIcon icon={faAnglesUp} className="arrow-shadow" />
      </div>
    </div>
  );
}

export default SlideUp;
