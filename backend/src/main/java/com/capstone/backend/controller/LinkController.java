
package com.capstone.backend.controller;

import com.capstone.backend.model.Links;
import com.capstone.backend.service.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/links") // URL path
public class LinkController {

    @Autowired(required = true)
    private LinkService Service;

    // get Links for a movieId
    @PostMapping("/{id}")
    public Links getLinkByMovieId(@PathVariable int id) throws Exception {
        return Service.getLinkByMovieId(id);
    }
}