package com.capstone.movie.controller;

import com.capstone.movie.model.Links;
import com.capstone.movie.service.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/links")
public class LinkController {

    @Autowired(required = true)
    private LinkService Service;

    @PostMapping("/{id}")
    public Links getLinkByMovieId(@PathVariable int id) throws Exception {
        return Service.getLinkByMovieId(id);
    }
}