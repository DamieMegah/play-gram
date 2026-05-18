import { useState, useEffect } from "react";
import { getNetflixMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import "../css/Netflix.css";

function Netflix() {
  const [netflixMovies, setNetflixMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNetflixContent = async () => {
      setLoading(true);
      try {
        const cacheKey = "movies_netflix";
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          if (parsedData && parsedData.length > 0) {
            setNetflixMovies(parsedData);
            setLoading(false);
            return;
          }
        }

        const data = await getNetflixMovies();
        setNetflixMovies(data);
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (err) {
        console.error(err);
        setError("Failed to load Netflix collection.");
      } finally {
        setLoading(false);
      }
    };

    fetchNetflixContent();
  }, []);

  return (
    <div className="netflix-page-container">
      {/* Background Ambient Glow & Particles */}
      <div className="netflix-ambient-glow"></div>
      <div className="netflix-particles">
        <span className="particle p1"></span>
        <span className="particle p2"></span>
        <span className="particle p3"></span>
        <span className="particle p4"></span>
        <span className="particle p5"></span>
        <span className="particle p6"></span>
      </div>

      {/* Cinematic Header Section */}
      <div className="netflix-hero-header">
        <div className="netflix-logo-wrapper">
          <div className="netflix-logo">NETFLIX</div>
        </div>
        <h2 className="netflix-subtitle">Originals & Popular Releases</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Grid Results */}
      <div className="netflix-results">
        {loading ? (
          <Loading />
        ) : (
          <div className="movie-grid-animated">
            {netflixMovies &&
              netflixMovies.map((movie, index) => (
                <div
                  className="animated-card-holder"
                  style={{ "--card-delay": `${index * 0.05}s` }}
                  key={movie.id}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Netflix;
