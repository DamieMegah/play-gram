import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "./css/App.css";
import Favourite from "./pages/Favourites";
import Genre from "./pages/Genre";
import NavBar from "./components/NavBar";
import SlideUp from "./components/SlideUp";
import MovieInfo from "./components/MovieInfo";
import SearchResults from "./components/SearchResults";
import About from "./pages/About";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isScrolling) return;

    const timeout = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [isScrolling]);

  const lastScrollTop = useRef(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollTop = scrollRef.current.scrollTop;

    setIsScrolled(scrollTop > 20);

    if (scrollTop > lastScrollTop.current) {
      setIsScrolling(true); // scrolling down
    }

    lastScrollTop.current = scrollTop;
  };

  const handleBackToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="app-container">
      <NavBar isScrolled={isScrolled} isScrolling={isScrolling} />
      {isScrolled && (
        <SlideUp isScrolled={isScrolled} onClick={handleBackToTop} />
      )}
      <main ref={scrollRef} onScroll={handleScroll} className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/genre/:genreId" element={<Home />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
