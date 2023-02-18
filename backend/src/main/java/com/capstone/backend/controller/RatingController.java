package com.capstone.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.capstone.backend.model.Ratings;
import com.capstone.backend.service.RatingService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/ratings")
public class RatingController {

    @Autowired(required = true)
    private RatingService ratingService;

    @PostMapping("/addRating")
    public String addRating(@RequestBody Ratings rating) {
        return ratingService.addRating(rating);
    }
}