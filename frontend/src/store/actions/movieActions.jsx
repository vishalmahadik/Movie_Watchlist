import * as api from "../../services/api";

export const fetchMovies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMovies();
    dispatch({ type: "FETCH_MOVIES", payload: data });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const addMovie = (movie) => async (dispatch) => {
  try {
    const { data } = await api.createMovie(movie);
    dispatch({ type: "ADD_MOVIE", payload: data });
  } catch (error) {
    console.error("Error adding movie:", error);
  }
};

export const editMovie = (id, movie) => async (dispatch) => {
  try {
    const { data } = await api.updateMovie(id, movie);
    dispatch({ type: "EDIT_MOVIE", payload: data });
  } catch (error) {
    console.error("Error editing movie:", error);
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await api.deleteMovie(id);
    dispatch({ type: "DELETE_MOVIE", payload: id });
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
};

export const toggleWatched = (id) => async (dispatch, getState) => {
  try {
    const state = getState();
    const movie = state.movies.movies.find((m) => m.id === id);
    const updatedMovie = { ...movie, watched: !movie.watched };
    const { data } = await api.updateMovie(id, updatedMovie);
    dispatch({ type: "EDIT_MOVIE", payload: data });
  } catch (error) {
    console.error("Error toggling watched status:", error);
  }
};

export const rateMovie = (id, rating) => async (dispatch, getState) => {
  try {
    const state = getState();
    const movie = state.movies.movies.find((m) => m.id === id);
    const updatedMovie = { ...movie, rating };
    const { data } = await api.updateMovie(id, updatedMovie);
    dispatch({ type: "EDIT_MOVIE", payload: data });
  } catch (error) {
    console.error("Error rating movie:", error);
  }
};

export const reviewMovie = (id, review) => async (dispatch, getState) => {
  try {
    const state = getState();
    const movie = state.movies.movies.find((m) => m.id === id);
    const updatedMovie = { ...movie, review };
    const { data } = await api.updateMovie(id, updatedMovie);
    dispatch({ type: "EDIT_MOVIE", payload: data });
  } catch (error) {
    console.error("Error reviewing movie:", error);
  }
};
