import React, { useState, useEffect } from "react";
import MovieService from "../services/MovieService";
import Pagination from "./Pagination";
import MoviePoster from "./MoviePosterSmall";
import { Link } from "react-router-dom";
import FavouriteService from "../services/FavouriteService";

// check user's role
const withRoleCheck = (Component) => {
  return () => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      window.location.href = "http://localhost:3000/admin-home";
      return null;
    } else if (!role) {
      window.location.href = "http://localhost:3000";
      return null;
    }

    return <Component />;
  };
};

const UserMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getMovies();
  }, []);

  // Fetch movie
  const getMovies = () => {
    MovieService.getAllMovies()
      .then((response) => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add movie to favourites by userId
  const addToFavourites = (movieId, title, genres) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const favourite = {
        movieId: movieId,
        title: title,
        genres: genres,
        userId: userId,
      };

      FavouriteService.addFavourite(favourite)
        .then((response) => {
          console.log(response);
          setSuccessMessage("Movie added to Favourites");
          setTimeout(() => {
            setSuccessMessage("");
          }, 1000); // 1 second delay
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please log in first to add to favourites.");
    }
  };

  // Index range of movies to be displayed
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = movies.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Movies</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Genres</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((movie) => (
            <tr key={movie.movieId}>
              <td>
                <MoviePoster movieId={movie.movieId} />
              </td>
              <td>{movie.title}</td>
              <td>{movie.genres}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                  to={`/view-movie/${movie.movieId}`}
                >
                  View Movie
                </Link>
                <Link
                  className="btn btn-success"
                  to={`/recommendations/${movie.movieId}`}
                >
                  Recommendation
                </Link>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    addToFavourites(movie.movieId, movie.title, movie.genres)
                  }
                >
                  Add to Favourites
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={movies.length}
        postsPerpage={postsPerPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default withRoleCheck(UserMovies);