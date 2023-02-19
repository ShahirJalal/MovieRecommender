import React, { useState, useEffect } from "react";
import FavouriteService from "../services/FavouriteService";
import MoviePoster from "./MoviePosterSmall";
import { Link } from "react-router-dom";

const withRoleCheck = (Component) => {
  return () => {
    const role = localStorage.getItem("role");

    if (!role) {
      window.location.href = "http://localhost:3000";
      return null;
    }

    return <Component />;
  };
};

const FavouritesList = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getFavourites();
  }, []);

  const getFavourites = () => {
    FavouriteService.getFavouriteById(localStorage.getItem("userId"))
      .then((response) => {
        setFavourites(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteFavourite = (favouriteId) => {
    FavouriteService.deleteFavourite(favouriteId)
      .then((response) => {
        console.log(response);
        getFavourites();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Favourites</h2>
      <br />
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
          {favourites.map((favourite) => (
            <tr key={favourite.favouriteId}>
              <td>
                <MoviePoster movieId={favourite.movieId} />
              </td>
              <td>{favourite.title}</td>
              <td>{favourite.genres}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                  to={`/view-movie/${favourite.movieId}`}
                >
                  View Movie
                </Link>
                <Link
                  className="btn btn-success"
                  to={`/recommendations/${favourite.movieId}`}
                >
                  Recommendation
                </Link>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteFavourite(favourite.favouriteId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withRoleCheck(FavouritesList);