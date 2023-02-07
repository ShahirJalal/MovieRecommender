package com.capstone.movie;

import com.capstone.movie.model.Movies;
import com.capstone.movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MovieApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(MovieApplication.class, args);
	}

	@Autowired
	private MovieRepository movieRepository;

	@Override
	public void run(String... args) throws Exception {

//		Movies mov = new Movies();
//		mov.setMovieId(121212);
//		mov.setTitle("CicakMan");
//		mov.setGenres("Horror");
//		movieRepository.addMovie(mov);

	}
}