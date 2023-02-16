package com.capstone.backend.controller;

import com.capstone.backend.model.Movies;
import com.capstone.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping("/getAll")
    public List<Movies> getAll() {
        return movieService.getAll();
    }

    @GetMapping("/getMovieById/{movieId}")
    public Movies getMovieById(@PathVariable("movieId") int movieId) {
        return movieService.getMovieById(movieId);
    }

    @GetMapping("/getFilteredMovieById/{movieId}")
    public Movies getFilteredMovieById(@PathVariable("movieId") int movieId) {
        return movieService.getFilteredMovieById(movieId);
    }

    @GetMapping("/getSimilarMovies/{movieId}")
    public List<Movies> getSimilarMovies(@PathVariable int movieId) {
        return movieService.getSimilarMovies(movieId);
    }

    @PostMapping("/addMovie")
    public String addMovie(@RequestParam("poster") MultipartFile posterFile,
                           @RequestParam("title") String title,
                           @RequestParam("genres") String genres) {
        String response;

        try {
            byte[] poster = posterFile.getBytes();
            Movies mov = new Movies();
            mov.setTitle(title);
            mov.setGenres(genres);
            mov.setPoster(poster);
            response = movieService.addMovie(mov);
        } catch (IOException e) {
            response = "Error uploading poster: " + e.getMessage();
        }

        return response;
    }

    @PutMapping("/updateMovie/{movieId}")
    public String updateMovie(@PathVariable int movieId, @RequestBody Movies mov) {
        return movieService.updateMovie(movieId, mov);
    }

    @DeleteMapping("/deleteMovie/{movieId}")
    public String deleteMovie(@PathVariable("movieId") int movieId) {
        return movieService.deleteMovie(movieId);
    }

    @GetMapping("/query")
    public List<String> runQuery(@RequestParam("query") String myQuery,
                                 @RequestParam("column") String myColumn) {
        return movieService.runQuery(myQuery, myColumn);
    }

}