// src/components/MovieDetails.js
import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const movie = useSelector((state) =>
    state.movies.movies.find((m) => m.id === parseInt(id))
  );

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{movie.title}</h2>
      <p>
        <strong>Description:</strong> {movie.description}
      </p>
      <p>
        <strong>Release Year:</strong> {movie.releaseYear}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Watched:</strong> {movie.watched ? "Yes" : "No"}
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating} / 5
      </p>
      <p>
        <strong>Review:</strong> {movie.review || "No review yet"}
      </p>
      <Link to="/" className="btn btn-primary">
        Back to List
      </Link>
    </div>
  );
}

export default MovieDetails;
