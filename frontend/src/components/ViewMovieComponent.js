import React, { useState, useEffect } from 'react';
import MoviePoster from './MoviePoster';
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
    <div>
      <h2>{movie.title}</h2>
      <p>Genre: {movie.genre}</p>
      <MoviePoster movieId={movieId} />
      <MovieOverview movieId={movieId} />
    </div>
  );
};

export default ViewMovieComponent;