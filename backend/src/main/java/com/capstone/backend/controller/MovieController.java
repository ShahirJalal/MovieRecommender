package com.capstone.backend.controller;

import com.capstone.backend.model.Movies;
import com.capstone.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/movies") // URL path
public class MovieController {

    @Autowired
    MovieService movieService;

    // Add new movie
    @PostMapping("/addMovie")
    public String addMovie(@RequestBody Movies mov) {
        return movieService.addMovie(mov);
    }

    // Get all movies
    @GetMapping("/getAll")
    public List<Movies> getAll() {
        return movieService.getAll();
    }

    // get movie by movieId
    @GetMapping("/getMovieById/{movieId}")
    public Movies getMovieById(@PathVariable("movieId") int movieId) {
        return movieService.getMovieById(movieId);
    }

    // Get filtered movie by movieId
    @GetMapping("/getFilteredMovieById/{movieId}")
    public Movies getFilteredMovieById(@PathVariable("movieId") int movieId) {
        return movieService.getFilteredMovieById(movieId);
    }

    // Get all similar movies to the movieId
    @GetMapping("/getSimilarMovies/{movieId}")
    public List<Movies> getSimilarMovies(@PathVariable int movieId) {
        return movieService.getSimilarMovies(movieId);
    }

    // Update existing movie
    @PutMapping("/updateMovie/{movieId}")
    public String updateMovie(@PathVariable int movieId, @RequestBody Movies mov) {
        return movieService.updateMovie(movieId, mov);
    }

    // Delete movie by movieId
    @DeleteMapping("/deleteMovie/{movieId}")
    public String deleteMovie(@PathVariable("movieId") int movieId) {
        return movieService.deleteMovie(movieId);
    }

    // Run SQL query and return a list of results
    @GetMapping("/query")
    public List<String> runQuery(@RequestParam("query") String myQuery,
                                 @RequestParam("column") String myColumn) {
        return movieService.runQuery(myQuery, myColumn);
    }

}