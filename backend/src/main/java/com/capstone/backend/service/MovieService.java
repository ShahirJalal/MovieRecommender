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

    // Add new movie
    public String addMovie(Movies mov) {
        String response;

        if (movieRepository.addMovie(mov)) {
            response = "Successfully added";
        } else {
            response = "Something went wrong. Not added, please try again";
        }
        return response;
    }

    // Get all movies
    public List<Movies> getAll() {
        return movieRepository.findAll();
    }

    // get movie by movieId
    public Movies getMovieById(int movieId) {
        return movieRepository.getMovieById(movieId);
    }

    // Get filtered movie by movieId
    public Movies getFilteredMovieById(int movieId) {
        return movieRepository.getFilteredMovieById(movieId);
    }

    // Get all similar movies to the movieId
    public List<Movies> getSimilarMovies(int movieId) {
        return movieRepository.getSimilarMovies(movieId);
    }

    // Update existing movie
    public String updateMovie(int movieId, Movies mov) {
        String response;

        if (movieRepository.updateMovie(movieId, mov))
            response = "Successfully updated";
        else
            response = "Something went wrong. Not updated, please try again";
        return response;
    }

    // Delete movie by movieId
    public String deleteMovie(int movieId) {
        String response;

        if (movieRepository.deleteMovie(movieId))
            response = "Successfully deleted";
        else
            response = "Something went wrong. Not deleted, please try again";
        return response;
    }

    // Run SQL query and return a list of results
    public List<String> runQuery(String myQuery, String myColumn){
        return movieRepository.runQuery(myQuery, myColumn);
    }

}