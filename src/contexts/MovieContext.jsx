import { createContext, useState, useContext } from "react";

const MovieContext = createContext();
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to restore Home without an API call
  const restoreHome = () => {
    const cachedMovies = localStorage.getItem("popular_movies");
    if (cachedMovies) {
      setMovies(JSON.parse(cachedMovies));
      setError(null);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        loading,
        setLoading,
        error,
        setError,
        restoreHome,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
