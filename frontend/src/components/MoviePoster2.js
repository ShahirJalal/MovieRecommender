import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieService from '../services/MovieService';
import React from 'react';


const useMoviePoster = (movieId) => {
  const [posterPath, setPosterPath] = useState("");
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
      setPosterPath(result.data.poster_path);
    };
    fetchData();
  }, [tmdbId]);

  return <img alt="" style={{borderRadius: "10px", display:"block", margin: '0 auto', maxWidth:"100%"}} src={`https://image.tmdb.org/t/p/original/${posterPath}`} />;
};

const MoviePoster = ({ movieId }) => {
  return useMoviePoster(movieId);
};

export default MoviePoster;