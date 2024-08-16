import React from "react";
import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";

function WatchedMovies() {
  const movies = useSelector((state) => state.movies.movies);
  const watchedMovies = movies.filter((movie) => movie.watched);

  return (
    <div className="watched-movies">
      <h2 className="mb-4">Watched Movies</h2>
      {watchedMovies.length === 0 ? (
        <p>You haven't watched any movies yet. Start watching!</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {watchedMovies.map((movie) => (
            <div className="col mb-4" key={movie.id}>
              <MovieItem movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchedMovies;
