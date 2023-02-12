package com.capstone.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.capstone.backend.model.Favourites;
import com.capstone.backend.service.FavouriteService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/favourites")
public class FavouriteController {
    @Autowired
    private FavouriteService favouriteService;

    @PostMapping("/addFavourite")
    public void addFavourite(@RequestBody Favourites favourite) {
        favouriteService.addFavourite(favourite);
    }
}