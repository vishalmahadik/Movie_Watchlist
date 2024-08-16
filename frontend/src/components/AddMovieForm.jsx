import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../store/actions/movieActions";

function AddMovieForm() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    releaseYear: "",
    genre: "",
    imageUrl: "", // Add this new field
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!movie.title.trim()) tempErrors.title = "Title is required";
    if (!movie.description.trim())
      tempErrors.description = "Description is required";
    if (!movie.releaseYear) tempErrors.releaseYear = "Release year is required";
    else if (
      isNaN(movie.releaseYear) ||
      movie.releaseYear < 1800 ||
      movie.releaseYear > new Date().getFullYear()
    )
      tempErrors.releaseYear = "Please enter a valid year";
    if (!movie.genre.trim()) tempErrors.genre = "Genre is required";
    if (!movie.imageUrl.trim()) tempErrors.imageUrl = "Image URL is required";
    else if (!isValidUrl(movie.imageUrl))
      tempErrors.imageUrl = "Please enter a valid URL";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const newMovie = {
        id: Date.now(),
        ...movie,
        watched: false,
        rating: 0,
        review: "",
      };

      dispatch(addMovie(newMovie));
      setMovie({
        title: "",
        description: "",
        releaseYear: "",
        genre: "",
        imageUrl: "",
      });
      setIsSubmitting(false);
      setSuccessMessage("Movie added successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (successMessage) {
      window.scrollTo(0, 0);
    }
  }, [successMessage]);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Add New Movie</h2>
        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage("")}
              aria-label="Close"
            ></button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              name="title"
              value={movie.title}
              onChange={handleChange}
              required
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              id="description"
              name="description"
              value={movie.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="releaseYear" className="form-label">
                Release Year
              </label>
              <input
                type="number"
                className={`form-control ${
                  errors.releaseYear ? "is-invalid" : ""
                }`}
                id="releaseYear"
                name="releaseYear"
                value={movie.releaseYear}
                onChange={handleChange}
              />
              {errors.releaseYear && (
                <div className="invalid-feedback">{errors.releaseYear}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
              <input
                type="text"
                className={`form-control ${errors.genre ? "is-invalid" : ""}`}
                id="genre"
                name="genre"
                value={movie.genre}
                onChange={handleChange}
              />
              {errors.genre && (
                <div className="invalid-feedback">{errors.genre}</div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="url"
              className={`form-control ${errors.imageUrl ? "is-invalid" : ""}`}
              id="imageUrl"
              name="imageUrl"
              value={movie.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/movie-poster.jpg"
            />
            {errors.imageUrl && (
              <div className="invalid-feedback">{errors.imageUrl}</div>
            )}
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Adding Movie...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Movie
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovieForm;
