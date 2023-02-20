import axios from "axios";

const MOVIE_BASE_REST_API_URL = "http://localhost:8080/api/v1/movies";

class MovieService {

  // Get all movies
  getAllMovies() {
    return axios.get(MOVIE_BASE_REST_API_URL + "/getAll");
  }

  // Create a new movie
  createMovie(movie) {
    return axios.post(MOVIE_BASE_REST_API_URL + "/addMovie", movie);
  }

  // Get a movie by movieId
  getMoviebyId(movieId) {
    return axios.get(MOVIE_BASE_REST_API_URL + "/getMovieById/" + movieId); 
  }

  // Update an existing movie
  updateMovie(movieId, movie) {
    return axios.put(MOVIE_BASE_REST_API_URL + "/updateMovie/" + movieId, movie); 
  }

  // Delete a movie by movieId
  deleteMovie(movieId) {
    return axios.delete(MOVIE_BASE_REST_API_URL + "/deleteMovie/" + movieId);
  }

  // Get links for a movie by movieId
  getLinksFromMovie(movieId) {
    return axios.post("http://localhost:8080/api/v1/links/" + movieId);
  }
}

export default new MovieService();