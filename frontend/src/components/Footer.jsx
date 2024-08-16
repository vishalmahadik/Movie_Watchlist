import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-white mt-4 py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Movie Watchlist</h5>
            <p>Keep track of your favorite movies and discover new ones.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/watched" className="text-white">
                  Watched Movies
                </Link>
              </li>
              <li>
                <Link to="/add" className="text-white">
                  Add Movie
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Connect</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://github.com/vishalmahadik"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <p>
            &copy; {new Date().getFullYear()} Movie Watchlist. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
