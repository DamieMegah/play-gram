import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "./css/App.css";
import Favourite from "./pages/Favourites";
import NavBar from "./components/NavBar";
import SlideUp from "./components/SlideUp";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      setIsScrolled(scrollTop > 20);
    }
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
      <NavBar isScrolled={isScrolled} />
      {isScrolled && (
        <SlideUp isScrolled={isScrolled} onClick={handleBackToTop} />
      )}
      <main ref={scrollRef} onScroll={handleScroll} className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
