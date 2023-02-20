import { useState, useEffect } from "react";
import axios from "axios";
import MovieService from "../services/MovieService";
import React from "react";

// Display movie poster by movieId
const useMoviePoster = (movieId) => {
  const [posterPath, setPosterPath] = useState("");
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

  // Get poster path using TMDB API
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
      );
      setPosterPath(result.data.poster_path);
    };
    fetchData();
  }, [tmdbId]);

  // Movie poster component
  return (
    <img
      alt=""
      style={{
        radius: "60px",
        flex: "1",
        display: "block",
        margin: "0 auto",
        width: "75px",
      }}
      src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
    />
  );
};

const MoviePoster = ({ movieId }) => {
  return useMoviePoster(movieId);
};

export default MoviePoster;