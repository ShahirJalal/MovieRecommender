import React, { useState, useEffect } from 'react';
import MoviePoster from './MoviePoster2';
import MovieOverview from './MovieOverview';
import MovieService from '../services/MovieService';
import { useParams } from 'react-router-dom';

const ViewMovieComponent = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    MovieService.getMoviebyId(movieId).then((response) => {
      setMovie(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, [movieId]);

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
          <MovieOverview movieId={movieId} />
        </div>
      </div>
    </div>
  );
};

export default ViewMovieComponent;