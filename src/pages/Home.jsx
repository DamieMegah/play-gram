import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Home() {
  const movies = [
    { id: 1, title: "John Wick", release_date: "2014" },
    { id: 2, title: "Terminator", release_date: "1992" },
    { id: 3, title: "J-Felx killer", release_date: "1994" },
    { id: 4, title: "Eron Dome", release_date: "2010" },
    { id: 5, title: "2012", release_date: "2013" },
    { id: 5, title: "Complances", release_date: "2019" },
  ];

  return (
    <div className="home">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
