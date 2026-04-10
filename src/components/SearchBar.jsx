import { useState, useRef, useEffect } from "react";
import "../css/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAllStoredMovies } from "../utils/getAllStoredMovies";

function SearchBar({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const allMovies = getAllStoredMovies();

    const filtered = allMovies
      .filter((movie) => {
        const title = movie.title.toLowerCase();
        const valueLower = value.toLowerCase();

        return valueLower.length < 3
          ? title.startsWith(valueLower)
          : title.includes(valueLower);
      })
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const v = value.toLowerCase();

        return bTitle.startsWith(v) - aTitle.startsWith(v);
      });

    setSuggestions(filtered.slice(0, 6));
  }

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);

    if (onClose) onClose();
  };

  const inputRef = useRef(null);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          ref={inputRef}
          value={searchQuery}
          onChange={handleChange}
        />

        <button type="submit" className="search-form-btn">
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <div className="suggestions">
          <h4>Recent History</h4>
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              className="suggestion-item"
              onClick={() => {
                navigate(`/movie/${movie.id}`);
                setSuggestions([]);
                if (onClose) onClose();
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
