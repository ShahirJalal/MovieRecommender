import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieService from "../services/MovieService";

// Display movie rating by movieId
const useMovieRating = (movieId) => {
  const [rating, setRating] = useState(0);
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

  // Get rating using TMDB API
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
      );
      setRating(result.data.vote_average / 2); // Convert 10 star to 5 star rating system
    };
    fetchData();
  }, [tmdbId]);

  return <label className="form-label">Rating: {rating.toFixed(1)}</label>; // Movie rating component
};

const MovieRating = ({ movieId }) => {
  return useMovieRating(movieId);
};

export default MovieRating;