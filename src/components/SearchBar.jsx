import { useState, useRef, useEffect } from "react";
import "../css/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    alert(searchQuery);
  }

  const inputRef = useRef(null);

  useEffect(() => {
    console.log("runing");
    // requestAnimationFrame is more reliable than setTimeout(0)
    // for focusing elements after a state change.
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-form-btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
