import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MoviePoster from './MoviePoster';
import { Link } from 'react-router-dom';

const RecommendComponent = () => {
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/movies/getSimilarMovies/${movieId}`);
      setMovies(result.data);
    };
    fetchData();
  }, [movieId]);

  return (
    <div className = "container"><br />
      <h2 className='text-center'> Recommended Movies</h2><br />
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
        {movies.map((movie) => (
          <tr key={movie.movieId}>
            <td>{movie.movieId}</td>
            <td><MoviePoster movieId={movie.movieId}/></td>
            <td>{movie.title}</td>
            <td>{movie.genres}</td>
            <td>
                <Link className='btn btn-success' to={`/recommendations/${movie.movieId}`}>Add To Favourite</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default RecommendComponent;