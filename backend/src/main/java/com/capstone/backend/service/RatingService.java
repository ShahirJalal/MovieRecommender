package com.capstone.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.model.Ratings;
import com.capstone.backend.repository.RatingRepository;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    // Add movie rating
    public String addRating(Ratings rating) {
        String response;

        try {
            ratingRepository.addRating(rating);
            response = "Rating successfully added.";
        } catch (Exception e) {
            response = "Something went wrong. Rating not added. Please try again.";
            e.printStackTrace();
        }

        return response;
    }
}