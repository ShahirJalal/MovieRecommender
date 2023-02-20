package com.capstone.backend.service;

import com.capstone.backend.model.Links;
import com.capstone.backend.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LinkService {
    @Autowired
    private LinkRepository linkRepository;

    // get Links for a movieId
    public Links getLinkByMovieId(int id)
    {
        return linkRepository.findLinkByMovieId(id);
    }

}