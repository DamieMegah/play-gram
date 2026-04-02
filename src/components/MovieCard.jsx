import "../css/MovieCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import testPic from "../assets/john-wick.jpg";

function MovieCard({ movie }) {
  function handleHeart() {
    alert("movie is like");
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
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
