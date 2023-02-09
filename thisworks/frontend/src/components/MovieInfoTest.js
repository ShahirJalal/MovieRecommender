import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoviePoster from './MoviePoster';
import MovieOverview from './MovieOverview';

const MovieInfo = ({ id, title, genres, rating }) => {
  const [ratingValue, setRatingValue] = useState(rating);

  const handleChange = (e) => {
    setRatingValue(e.target.value);
  };

  const checkTextInput = (e) => {
    e.preventDefault();
    console.log('Submitting rating: ', ratingValue);
  };

  const AddMovietoFav = (id) => {
    console.log('Adding movie to favorites: ', id);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Movie Info</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <MoviePoster movieid={id} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Movie Title: {title}</label>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Genres: {genres}</label>
              </div>
              <div className="form-group mb-2">
                <MovieOverview movieid={id} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Rating Score: {rating}</label>
              </div>
              <div className="form-group mb-2">
                <input
                  type="number"
                  placeholder="Rate this movie?(1-5)"
                  name="rating"
                  className="form-control"
                  value={ratingValue}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn btn-success"
                onClick={(e) => {
                  checkTextInput(e);
                }}
              >
                Rate Movie
              </button>
              <button
                to="/movies"
                style={{ marginLeft: '10px' }}
                onClick={(id) => {
                  AddMovietoFav(id);
                }}
                className="btn btn-primary"
              >
                Add to Favourite
              </button>
              <Link to="/movies" style={{ marginLeft: '10px' }} className="btn btn-danger">
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;