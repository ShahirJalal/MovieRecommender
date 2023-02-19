import axios from "axios";

const MOVIE_BASE_REST_API_URL = "http://localhost:8080/api/v1/movies";

class MovieService {
  getAllMovies() {
    return axios.get(MOVIE_BASE_REST_API_URL + "/getAll"); //get method
  }
  createMovie(movie) {
    return axios.post(MOVIE_BASE_REST_API_URL + "/addMovie", movie); //post method
  }
  getMoviebyId(movieId) {
    return axios.get(MOVIE_BASE_REST_API_URL + "/getMovieById/" + movieId); //get method
  }
  updateMovie(movieId, movie) {
    return axios.put(MOVIE_BASE_REST_API_URL + "/updateMovie/" + movieId, movie); //put method
  }
  deleteMovie(movieId) {
    return axios.delete(MOVIE_BASE_REST_API_URL + "/deleteMovie/" + movieId); //delete method
  }
  getLinksFromMovie(movieId) {
    return axios.post("http://localhost:8080/api/v1/links/" + movieId);
  }
}

export default new MovieService();