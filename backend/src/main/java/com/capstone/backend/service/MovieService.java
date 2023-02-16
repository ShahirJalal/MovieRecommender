package com.capstone.backend.service;

import com.capstone.backend.model.Movies;
import com.capstone.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    MovieRepository movieRepository;

    private final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private final String DB_URL = "jdbc:mysql://localhost/MoviesDB";
    private final String USER = "user";
    private final String PASS = "password";

    public List<Movies> getAll() {
        return movieRepository.findAll();
    }

    public Movies getMovieById(int movieId) {
        return movieRepository.getMovieById(movieId);
    }

    public Movies getFilteredMovieById(int movieId) {
        return movieRepository.getFilteredMovieById(movieId);
    }

    public List<String> runQuery(String myQuery, String myColumn){
        return movieRepository.runQuery(myQuery, myColumn);
    }

    public List<Movies> getSimilarMovies(int movieId) {
        return movieRepository.getSimilarMovies(movieId);
    }

    public String addMovie(Movies mov) {
        String response;

        if (mov.getPoster() == null) {
            response = "Poster is missing. Please upload a poster for the movie.";
        } else if (movieRepository.addMovie(mov)) {
            response = "Successfully added";
        } else {
            response = "Something went wrong. Not added, please try again";
        }

        return response;
    }

    public String updateMovie(int movieId, Movies mov) {
        String response;

        if (movieRepository.updateMovie(movieId, mov))
            response = "Successfully updated";
        else
            response = "Something went wrong. Not updated, please try again";
        return response;
    }

    public String deleteMovie(int movieId) {
        String response;

        if (movieRepository.deleteMovie(movieId))
            response = "Successfully deleted";
        else
            response = "Something went wrong. Not deleted, please try again";
        return response;
    }

}