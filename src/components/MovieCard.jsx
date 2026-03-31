import "../css/MovieCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import testPic from "../assets/test-pic.jpg";

function MovieCard({ movie }) {
  function handleHeart() {
    alert("movie is like");
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={testPic} alt={movie.title} />
        <div className="movie-overlay">
          <button onClick={handleHeart}>
            <FontAwesomeIcon icon={faHeart} className="fav-icon" />
          </button>
        </div>
      </div>
      <div className="movie-info">
        <div className="title-box">
          <h3>{movie.title}</h3>
          <p>({movie.release_date})</p>
        </div>
        <div className="rating">
          <FontAwesomeIcon icon={faStar} className="star" />
          <FontAwesomeIcon icon={faStar} className="star" />
          <FontAwesomeIcon icon={faStar} className="star" />
          <FontAwesomeIcon icon={faStar} className="star" />
          <FontAwesomeIcon icon={faStar} className="star" />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
