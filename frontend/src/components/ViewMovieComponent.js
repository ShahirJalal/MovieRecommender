import React, { useState, useEffect } from 'react';
import MoviePoster from './MoviePoster2';
import MovieOverview from './MovieOverview';
import MovieService from '../services/MovieService';
import RatingService from '../services/RatingService';
import { useParams } from 'react-router-dom';

const ViewMovieComponent = () => {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const { movieId } = useParams();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    MovieService.getMoviebyId(movieId).then((response) => {
      setMovie(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, [movieId]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = (event) => {
    event.preventDefault();
    const data = {
      userId,
      movieId,
      rating
    };
    RatingService.addRating(data).then((response) => {
      alert(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <div className="container my-5">
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
              <label htmlFor="rating">Rate this movie:</label>
              <div className="rating">
                <input type="radio" id="star1" name="rating" value="1" onChange={handleRatingChange} />
                <label htmlFor="star1"></label>
                <input type="radio" id="star2" name="rating" value="2" onChange={handleRatingChange} />
                <label htmlFor="star2"></label>
                <input type="radio" id="star3" name="rating" value="3" onChange={handleRatingChange} />
                <label htmlFor="star3"></label>
                <input type="radio" id="star4" name="rating" value="4" onChange={handleRatingChange} />
                <label htmlFor="star4"></label>
                <input type="radio" id="star5" name="rating" value="5" onChange={handleRatingChange} />
                <label htmlFor="star5"></label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit Rating</button>
          </form>
          <MovieOverview movieId={movieId} />
        </div>
      </div>
    </div>
  );
};

export default ViewMovieComponent;
