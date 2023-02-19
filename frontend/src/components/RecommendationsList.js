import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MoviePoster from './MoviePosterSmall';
import FavouriteService from '../services/FavouriteService';
import { Link } from 'react-router-dom';

const withRoleCheck = (Component) => {
  return () => {
    const role = localStorage.getItem('role');

    if (!role) {
      window.location.href = 'http://localhost:3000';
      return null;
    }

    return <Component />;
  };
};

const RecommendComponent = () => {
  const [movies, setMovies] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/movies/getSimilarMovies/${movieId}`);
      setMovies(result.data);
    };
    fetchData();
  }, [movieId]);

  const addToFavourites = (movieId, title, genres) => {
    const userId = localStorage.getItem('userId');
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
          setSuccessMessage('Movie added to Favourites');
          setTimeout(() => {
            setSuccessMessage('');
          }, 1000); // 1 second delay
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Please log in first to add to favourites.');
    }
  };  

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Recommended Movies</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
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
          {movies.map((movie) => (
            <tr key={movie.movieId}>
              <td>
                <MoviePoster movieId={movie.movieId} />
              </td>
              <td>{movie.title}</td>
              <td>{movie.genres}</td>
              <td>
                <Link className='btn btn-primary' 
                                      to={`/view-movie/${movie.movieId}`}>View Movie
                </Link>
                <Link className='btn btn-success' style={{marginLeft:"10px"}} to={`/recommendations/${movie.movieId}`}>Recommendation</Link>
                <button
                  className="btn btn-success" style={{marginLeft:"10px"}}
                  onClick={() => addToFavourites(movie.movieId, movie.title, movie.genres)}
                >
                  Add To Favourite
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withRoleCheck(RecommendComponent);