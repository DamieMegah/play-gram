import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { getPopularMovies } from "../services/api.js";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useMovieContext } from "../contexts/MovieContext";

function Home() {
  //  Pull everything from the GLOBAL context
  const { movies, setMovies, loading, setLoading, error, setError } =
    useMovieContext();

  useEffect(() => {
    const loadPopularMovies = async () => {
      const cached = localStorage.getItem("popular_movies");
      if (cached) {
        setMovies(JSON.parse(cached));
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);

        localStorage.setItem("popular_movies", JSON.stringify(popularMovies));
      } catch (err) {
        setError("Fail to get popular movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  return (
    <div className="home">
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Loading />
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} isSelected={false} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
