import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieService from '../services/MovieService'

const useMovieOverview = (movieId) => {
  const [overview, setOverview] = useState("");
  const [tmdbId, setTmdbId] = useState("");

  useEffect(() => {
    MovieService.getLinksFromMovie(movieId).then((response) => {
      setTmdbId(response.data.tmdbId);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`);
      setOverview(result.data.overview);
    };
    fetchData();
  }, [tmdbId]);

  return <p style={{textAlign: 'center'}}>{overview}</p>;
};

const MovieOverview = ({ movieId }) => {
  return useMovieOverview(movieId);
};

export default MovieOverview;