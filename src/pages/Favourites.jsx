import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

const Favourite = () => {
  const { favourites } = useMovieContext();
  if (favourites) {
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
      <p>Your favorites movies will show here </p>
    </div>
  );
};

export default Favourite;
