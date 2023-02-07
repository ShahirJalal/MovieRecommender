package com.capstone.movie.service;

import com.capstone.movie.model.Links;
import com.capstone.movie.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LinkService {
    @Autowired
    private LinkRepository linkRepository;


    public Links getLinkByMovieId(int id)
    {
        return linkRepository.findLinkByMovieId(id);
    }

}
