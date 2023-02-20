import React, { useState, useEffect } from "react";
import MovieService from "../services/MovieService";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import MoviePoster from "./MoviePosterSmall";
import FavouriteService from "../services/FavouriteService";

// check user's role
const withRoleCheck = (Component) => {
  return () => {
    const role = localStorage.getItem("role");

    if (role === "user") {
      window.location.href = "http://localhost:3000/user-home";
      return null;
    } else if (!role) {
      window.location.href = "http://localhost:3000";
      return null;
    }

    return <Component />;
  };
};

const ListMovieComponent = () => {
  const [movie, setMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    getMovies(); 
  }, []);
  
  // Fetch movie
  const getMovies = () => {
    MovieService.getAllMovies()
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete movie
  const deleteMovie = (movieId) => {
    MovieService.deleteMovie(movieId)
      .then((response) => {
        getMovies();
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
  const curentPosts = movie.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="container">
      <br />
      <h2 className="text-center"> Movies </h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <Link to="/add-Movie" className="btn btn-primary mb-2">
        {" "}
        Add New Movie{" "}
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th> Movie Id </th>
            <th> Poster </th>
            <th> Title </th>
            <th> Genres </th>
            <th> Function </th>
          </tr>
        </thead>
        <tbody>
          {curentPosts.map((movie) => (
            <tr key={movie.movieId}>
              <td> {movie.movieId} </td>
              <td>
                <MoviePoster movieId={movie.movieId} />
              </td>
              <td> {movie.title} </td>
              <td> {movie.genres} </td>
              <td>
                <Link
                  className="btn btn-warning"
                  to={`/edit-movie/${movie.movieId}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMovie(movie.movieId)}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  Delete
                </button>
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
                <Link
                  className="btn btn-primary"
                  style={{ marginTop: "10px" }}
                  to={`/view-movie/${movie.movieId}`}
                >
                  View Movie
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={movie.length}
        postsPerpage={postsPerPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};
export default withRoleCheck(ListMovieComponent);