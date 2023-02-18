package com.capstone.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.capstone.backend.model.Ratings;

@Repository
public class RatingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addRating(Ratings rating) {
        String sql = "INSERT INTO demo_ratings (userid, movieid, rating) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, rating.getUserId(), rating.getMovieId(), rating.getRating());
    }
}