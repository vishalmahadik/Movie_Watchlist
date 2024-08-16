const initialState = {
  movies: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "EDIT_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };
    case "TOGGLE_WATCHED":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload
            ? { ...movie, watched: !movie.watched }
            : movie
        ),
      };
    case "RATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id
            ? { ...movie, rating: action.payload.rating }
            : movie
        ),
      };
    case "REVIEW_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id
            ? { ...movie, review: action.payload.review }
            : movie
        ),
      };
    default:
      return state;
  }
};

export default moviesReducer;
