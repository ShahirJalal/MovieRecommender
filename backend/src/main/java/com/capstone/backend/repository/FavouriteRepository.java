package com.capstone.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.capstone.backend.model.Favourites;

@Repository
public class FavouriteRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addFavourite(Favourites favourite) {
        String INSERT_FAVOURITE = "INSERT INTO demo_favourites (movieId, title, genres, userId) VALUES (?,?,?,?)";
        jdbcTemplate.update(INSERT_FAVOURITE, favourite.getMovieId(), favourite.getTitle(), favourite.getGenres(), favourite.getUserId());
    }
}