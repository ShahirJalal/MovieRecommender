package com.capstone.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.capstone.backend.model.Favourites;
import com.capstone.backend.service.FavouriteService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/favourites") // map URL path
public class FavouriteController {
    @Autowired
    private FavouriteService favouriteService;

    // Add favourite movie
    @PostMapping("/addFavourite")
    public void addFavourite(@RequestBody Favourites favourite) {
        favouriteService.addFavourite(favourite);
    }

    // Get all favourite movies
    @GetMapping("/getAll")
    public List<Favourites> getAll() {
        return favouriteService.getAll();
    }

    // Get all favourite movies for a userId
    @GetMapping("/favourites/{userId}")
    public List<Favourites> getFavouriteById(@PathVariable int userId) {
        return favouriteService.getFavouriteById(userId);
    }

    // Delete a favourite movie
    @DeleteMapping("/deleteFavourite/{favouriteId}")
    public String deleteFavourite(@PathVariable("favouriteId") int favouriteId) {
        return favouriteService.deleteFavourite(favouriteId);
    }

}