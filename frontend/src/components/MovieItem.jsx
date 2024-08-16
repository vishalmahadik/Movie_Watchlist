import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import "../App.css";

import {
  toggleWatched,
  deleteMovie,
  rateMovie,
  reviewMovie,
} from "../store/actions/movieActions";
import EditMovieForm from "./EditMovieForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function MovieItem({ movie }) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(movie.rating);
  const [review, setReview] = useState(movie.review);
  const dispatch = useDispatch();
  const [saveConfirmation, setSaveConfirmation] = useState(false);
  const [editConfirmation, setEditConfirmation] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const handleToggleWatched = () => {
    dispatch(toggleWatched(movie.id));
  };

  const handleDeleteMovie = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovie(movie.id));
    }
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    dispatch(rateMovie(movie.id, newRating));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(reviewMovie(movie.id, review));
    setSaveConfirmation(true);

    // Hide the confirmation message after 3 seconds
    setTimeout(() => {
      setSaveConfirmation(false);
    }, 3000);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setSaveConfirmation(false);
  };

  const handleEditClick = () => {
    setSaveConfirmation(false);
    setEditConfirmation(false);
  };

  const handleEditComplete = (updatedMovie, success) => {
    setRating(updatedMovie.rating);
    setReview(updatedMovie.review);
    if (success) {
      setEditConfirmation(true);
      // Hide the edit confirmation message after 3 seconds
      setTimeout(() => {
        setEditConfirmation(false);
      }, 3000);
    }
    // Close the modal
    document.querySelector(`#editMovieModal-${movie.id} .btn-close`).click();
  };

  if (isEditing) {
    return <EditMovieForm movie={movie} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="card h-100">
      <div
        className="card-img-top-wrapper"
        style={{
          height: "400px",
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          className="card-img-top"
          src={
            movie.imageUrl ||
            `https://via.placeholder.com/300x450/f0f0f0/808080?text=${encodeURIComponent(
              movie.title
            )}`
          }
          alt={`${movie.title} poster`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/300x450/f0f0f0/808080?text=${encodeURIComponent(
              movie.title
            )}`;
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.title}</h5>
        <div className="card-text">
          {movie.description.length > 100 ? (
            <>
              {truncateDescription(movie.description, 100)}
              <button
                className="btn read-m btn-link text-decoration-none btn-info btn-sm p-0 ml-1"
                data-bs-toggle="modal"
                data-bs-target={`#descriptionModal-${movie.id}`}
              >
                Show more
              </button>
            </>
          ) : (
            movie.description
          )}
        </div>
        <div className="card-text">
          <small className="text-muted">
            Release Year: {movie.releaseYear} | Genre: {movie.genre}
          </small>
        </div>
        <motion.div
          className="form-check mb-2 my-2 d-flex align-items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <motion.input
            type="checkbox"
            className="form-check-input me-2"
            checked={movie.watched}
            onChange={handleToggleWatched}
            id={`watched-${movie.id}`}
            style={{ cursor: "pointer" }}
            animate={{
              scale: isHovered ? 1 : 1,
            }}
          />
          <motion.label
            className="form-check-label user-select-none"
            htmlFor={`watched-${movie.id}`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
              color: movie.watched ? "#007bff" : "#212529",
            }}
          >
            {movie.watched ? "Watched" : "Mark as Watched"}
          </motion.label>
          {movie.watched && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="ms-2 text-success"
            >
              ✓
            </motion.span>
          )}
        </motion.div>
        <div className="mb-2">
          <strong>Rating: </strong>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
              }}
            >
              ★
            </span>
          ))}
        </div>
        <form onSubmit={handleReviewSubmit} className="mb-3">
          <div className="mb-2">
            <label htmlFor={`review-${movie.id}`} className="form-label">
              Review:
            </label>
            <textarea
              className="form-control"
              id={`review-${movie.id}`}
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here"
            ></textarea>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button type="submit" className="btn btn-primary">
                Save Review
              </button>
              {saveConfirmation && (
                <span className="text-success ms-2">Review saved!</span>
              )}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                data-bs-toggle="modal"
                data-bs-target={`#editMovieModal-${movie.id}`}
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleDeleteMovie}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
        {editConfirmation && (
          <div className="alert alert-success" role="alert">
            Movie details updated successfully!
          </div>
        )}
      </div>
      {/* Description Modal */}
      <div
        className="modal fade"
        id={`descriptionModal-${movie.id}`}
        tabIndex="-1"
        aria-labelledby={`descriptionModalLabel-${movie.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`descriptionModalLabel-${movie.id}`}
              >
                {movie.title} - Full Description
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{movie.description}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <div
        className="modal fade"
        id={`editMovieModal-${movie.id}`}
        tabIndex="-1"
        aria-labelledby={`editMovieModalLabel-${movie.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`editMovieModalLabel-${movie.id}`}
              >
                Edit Movie
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditMovieForm
                movie={movie}
                onEditComplete={handleEditComplete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const truncateDescription = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "..";
};

export default MovieItem;
