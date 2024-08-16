import React, { useState, useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import store from "./store";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import MovieDetails from "./components/MovieDetails";
import WatchedMovies from "./components/WatchedMovies";
import Footer from "./components/Footer";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentSearchTerm = searchParams.get("search") || "";
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-film me-2"></i>
            Movie Watchlist
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  <i className="bi bi-house-door me-1"></i>Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/watched" ? "active" : ""
                  }`}
                  to="/watched"
                >
                  <i className="bi bi-check-circle me-1"></i>Watched Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/add" ? "active" : ""
                  }`}
                  to="/add"
                >
                  <i className="bi bi-plus-circle me-1"></i>Add Movie
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search movies"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <NavBar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<MovieList />} />

              <Route path="/add" element={<AddMovieForm />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watched" element={<WatchedMovies />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
