import React, { useState, useEffect } from "react";
import MoviePoster from "./MoviePosterBig";
import MovieOverview from "./MovieOverview";
import MovieService from "../services/MovieService";
import RatingService from "../services/RatingService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FavouriteService from "../services/FavouriteService";
import StarRatings from "react-star-ratings";
import MovieRating from "./MovieRating";

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

const ViewMovieComponent = () => {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const { movieId } = useParams();
  const userId = localStorage.getItem("userId");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    MovieService.getMoviebyId(movieId)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  const handleRatingSubmit = (event) => {
    event.preventDefault();
    const data = {
      userId,
      movieId,
      rating,
    };
    RatingService.addRating(data)
      .then(() => {
        setSuccessMessage("Rating submitted successfully");
        setRating(0); // Reset the rating value
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000); // Hide the success message after 1 second
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  return (
    <div className="container my-5">
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="row">
        <div className="col-md-4">
          <MoviePoster movieId={movieId} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p className="text-muted">{movie.genres}</p>
          <hr />
          <form onSubmit={handleRatingSubmit}>
            <div className="form-group">
              <MovieRating movieId={movieId} />
              <br />
              <label htmlFor="rating">Rate this movie:</label>
              <div className="rating">
                <StarRatings
                  rating={rating}
                  starRatedColor="orange"
                  starHoverColor="orange"
                  starDimension="25px"
                  starSpacing="5px"
                  changeRating={setRating}
                  numberOfStars={5}
                  name="rating"
                />
              </div>
              <br />
            </div>
            <button type="submit" className="btn btn-warning">
              Submit Rating
            </button>
          </form>
          <br />
          <MovieOverview movieId={movieId} />
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
        </div>
      </div>
    </div>
  );
};

export default withRoleCheck(ViewMovieComponent);