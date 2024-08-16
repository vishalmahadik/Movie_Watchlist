import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../store/actions/movieActions";
import MovieItem from "./MovieItem";
import { useSearchParams } from "react-router-dom";
import MovieSort from "./MovieSort"; // Make sure this import is correct

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "default";

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const filteredAndSortedMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "date-asc":
          return a.releaseYear - b.releaseYear;
        case "date-desc":
          return b.releaseYear - a.releaseYear;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="movie-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Watchlist</h2>
        <MovieSort />
      </div>
      {searchTerm && (
        <p>
          Showing results for: <strong>{searchTerm}</strong>
        </p>
      )}
      {filteredAndSortedMovies.length === 0 ? (
        <p>
          {searchTerm
            ? `No movies found matching "${searchTerm}"`
            : "No movies in your watchlist. Add some movies!"}
        </p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredAndSortedMovies.map((movie) => (
            <div className="col mb-4" key={movie.id}>
              <MovieItem movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
