import { useState, useEffect } from "react";
import axios from "axios";
import MovieService from "../services/MovieService";
import React from "react";

// Display movie description by movieId
const useMovieOverview = (movieId) => {
  const [overview, setOverview] = useState("");
  const [tmdbId, setTmdbId] = useState("");

  // Get tmdbId by movieId
  useEffect(() => {
    MovieService.getLinksFromMovie(movieId)
      .then((response) => {
        setTmdbId(response.data.tmdbId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get movie overview using TMDB API
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
      );
      setOverview(result.data.overview);
    };
    fetchData();
  }, [tmdbId]);

  return <label className="form-label"> Description: {overview}</label>; // Movie description component
};

const MovieOverview = ({ movieId }) => {
  return useMovieOverview(movieId);
};

export default MovieOverview;