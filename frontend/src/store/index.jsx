// src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Changed this line
import moviesReducer from "./reducers/moviesReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

// Add Redux DevTools Extension support
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
