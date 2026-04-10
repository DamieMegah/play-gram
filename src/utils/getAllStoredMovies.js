export function getAllStoredMovies() {
  const keys = [
    "popular_movies",
    "search_results",
    "favourites",
    "movie_history",
  ];

  let allMovies = [];

  keys.forEach((key) => {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    allMovies = [...allMovies, ...data];
  });

  // remove duplicates
  const unique = new Map();

  allMovies.forEach((movie) => {
    unique.set(movie.id, movie);
  });

  return Array.from(unique.values());
}
