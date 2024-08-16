// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchMovies = () => axios.get(`${API_URL}/movies`);
export const fetchMovie = (id) => axios.get(`${API_URL}/movies/${id}`);
export const createMovie = (movie) => axios.post(`${API_URL}/movies`, movie);
export const updateMovie = (id, movie) =>
  axios.put(`${API_URL}/movies/${id}`, movie);
export const deleteMovie = (id) => axios.delete(`${API_URL}/movies/${id}`);
