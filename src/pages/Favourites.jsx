import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Favourite = () => {
  const { favourites } = useMovieContext();
  if (favourites.length > 0) {
    return (
      <div>
        <h2>Your Favourites</h2>
        <div className="movie-grid">
          {favourites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favourite-empty">
      <h4>No favourite movie yet</h4>
      <p>
        Add movies to favorites by clicking on the <br />
        <FontAwesomeIcon
          icon={faHeart}
          style={{ fontSize: "2rem", margin: "4rem" }}
        />{" "}
        <br />
        on the movie cards
      </p>
    </div>
  );
};

export default Favourite;
