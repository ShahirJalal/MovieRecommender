package com.capstone.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.model.Favourites;
import com.capstone.backend.repository.FavouriteRepository;

import java.util.List;

@Service
public class FavouriteService {
    @Autowired
    private FavouriteRepository favouriteRepository;

    public String addFavourite(Favourites favourite) {
        String response;

        if (favouriteRepository.addFavourite(favourite))
            response = "Successfully added to favourites";
        else
            response = "Something went wrong. Not added to favourites, please try again";
        return response;
    }

    public List<Favourites> getAll() {
        return favouriteRepository.getAll();
    }

    public List<Favourites> getFavouriteById(int userId) {
        return favouriteRepository.getFavouriteById(userId);
    }

    public String deleteFavourite(int favouriteId) {
        String response;

        if (favouriteRepository.deleteFavourite(favouriteId))
            response = "Favourite deleted successfully";
        else
            response = "Something went wrong. Favourite not deleted, please try again";

        return response;
    }

}