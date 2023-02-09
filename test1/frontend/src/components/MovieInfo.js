import React from 'react';
import MoviePoster from './MoviePoster';

const MovieInfo = ({ movie }) => {
  return (
    <div>
      <td><MoviePoster movieId={movie.movieId} /></td>
      <td>
        <p>{movie.title}</p>
        <p>{movie.genres}</p>
      </td>
    </div>
  );
};

export default MovieInfo;