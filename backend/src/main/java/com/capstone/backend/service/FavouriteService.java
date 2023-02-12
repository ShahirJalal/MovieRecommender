package com.capstone.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.model.Favourites;
import com.capstone.backend.repository.FavouriteRepository;

@Service
public class FavouriteService {
    @Autowired
    private FavouriteRepository favouriteRepository;

    public void addFavourite(Favourites favourite) {
        favouriteRepository.addFavourite(favourite);
    }
}