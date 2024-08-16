import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editMovie } from "../store/actions/movieActions";

function EditMovieForm({ movie, onEditComplete }) {
  const [formData, setFormData] = useState({
    title: movie.title,
    description: movie.description,
    releaseYear: movie.releaseYear,
    genre: movie.genre,
    rating: movie.rating,
    review: movie.review,
    imageUrl: movie.imageUrl, // Add this new field
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
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
    if (!formData.title.trim()) tempErrors.title = "Title is required";
    if (!formData.description.trim())
      tempErrors.description = "Description is required";
    if (!formData.releaseYear)
      tempErrors.releaseYear = "Release year is required";
    else if (
      isNaN(formData.releaseYear) ||
      formData.releaseYear < 1800 ||
      formData.releaseYear > new Date().getFullYear()
    )
      tempErrors.releaseYear = "Please enter a valid year";
    if (!formData.genre.trim()) tempErrors.genre = "Genre is required";
    if (!formData.imageUrl.trim())
      tempErrors.imageUrl = "Image URL is required";
    else if (!isValidUrl(formData.imageUrl))
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
      const updatedMovie = {
        ...movie,
        ...formData,
      };
      dispatch(editMovie(movie.id, updatedMovie));
      setIsSubmitting(false);
      onEditComplete(updatedMovie, true);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Edit Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="editTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="editTitle"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="editDescription" className="form-label">
              Description
            </label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              id="editDescription"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="editReleaseYear" className="form-label">
                Release Year
              </label>
              <input
                type="number"
                className={`form-control ${
                  errors.releaseYear ? "is-invalid" : ""
                }`}
                id="editReleaseYear"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
              />
              {errors.releaseYear && (
                <div className="invalid-feedback">{errors.releaseYear}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="editGenre" className="form-label">
                Genre
              </label>
              <input
                type="text"
                className={`form-control ${errors.genre ? "is-invalid" : ""}`}
                id="editGenre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
              {errors.genre && (
                <div className="invalid-feedback">{errors.genre}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="editImageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="url"
              className={`form-control ${errors.imageUrl ? "is-invalid" : ""}`}
              id="editImageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/movie-poster.jpg"
            />
            {errors.imageUrl && (
              <div className="invalid-feedback">{errors.imageUrl}</div>
            )}
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-secondary me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
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
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMovieForm;
