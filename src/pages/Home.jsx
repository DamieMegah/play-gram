import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { getPopularMovies } from "../services/api.js";
import { useEffect } from "react"; // Remove useState here
import Loading from "../components/Loading";
import { useMovieContext } from "../contexts/MovieContext";

function Home() {
  //  Pull everything from the GLOBAL context
  const { movies, setMovies, loading, setLoading, error, setError } =
    useMovieContext();

  useEffect(() => {
  const loadPopularMovies = async () => {
    // 1Check if we already have them in Local Storage first
    const cached = localStorage.getItem("popular_movies");
    if (cached) {
      setMovies(JSON.parse(cached));
      setLoading(false);
      return; 
    }

    // If not cached, fetch from API
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
}, [])

  return (
    <div className="home">
      {/* Use the global error, loading, and movies */}
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Loading />
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
