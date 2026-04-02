import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/NavBar.css";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import { useMovieContext } from "../contexts/MovieContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTags,
  faHeart,
  faSearch,
  faArrowLeftLong,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ isScrolled }) {
  const navigate = useNavigate();
  const Location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { restoreHome } = useMovieContext();

  const handleSearchIcon = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
  };
  useEffect(() => {
    if (isSearchActive) {
      setCanGoBack(false);
    } else if (window.history.length > 1 && Location.pathname !== "/") {
      setCanGoBack(true);
    } else {
      setCanGoBack(false);
    }
  }, [Location, isSearchActive]);

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <nav className="navbar">
      {canGoBack ? (
        <div className="mobile-back-trigger" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeftLong} className="icon-back" />
        </div>
      ) : (
        <div className="space"></div>
      )}
      {!isSearchActive && (
        <div className="nav-logo-wrapper">
          <Logo />
        </div>
      )}

      <div className="desktop-search">
        <SearchBar />
      </div>

      {isSearchActive ? (
        <div className="mobile-search-overlay">
          <SearchBar onClose={handleCloseSearch} />
          <button className="close-search" onClick={handleCloseSearch}>
            ✕
          </button>
        </div>
      ) : (
        <div className="mobile-search-trigger" onClick={handleSearchIcon}>
          <FontAwesomeIcon icon={faSearch} className="icon-search" />
        </div>
      )}

      <div className={`navbar-links ${isScrolled ? "scrolled" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "icon-active" : "icon-default"
          }
          onClick={restoreHome}
        >
          <span className="nav-text">Home</span>
          <div className="icon-container">
            <FontAwesomeIcon icon={faHome} className="icon-outline" />
            <p className="icon-outline-p">Home</p>
          </div>
        </NavLink>

        <NavLink
          to="/favourite"
          className={({ isActive }) =>
            isActive ? "icon-active" : "icon-default"
          }
        >
          <span className="nav-text">Favourite</span>
          <div className="icon-container">
            <FontAwesomeIcon icon={faHeart} className="icon-outline" />
            <p className="icon-outline-p">Favorites</p>
          </div>
        </NavLink>

        <NavLink
          to="/downloads"
          className={({ isActive }) =>
            isActive ? "icon-active" : "icon-default"
          }
        >
          <span className="nav-text">Watchlist</span>
          <div className="icon-container">
            <FontAwesomeIcon icon={faTags} className="icon-outline" />
            <p className="icon-outline-p">Watchlist</p>
          </div>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "icon-active" : "icon-default"
          }
        >
          <span className="nav-text">playgram</span>
          <div className="icon-container">
            <FontAwesomeIcon icon={faPlay} className="icon-outline" />
            <p className="icon-outline-p">Playgram</p>
          </div>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
