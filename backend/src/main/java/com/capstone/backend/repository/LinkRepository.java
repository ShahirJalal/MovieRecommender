package com.capstone.backend.repository;

import com.capstone.backend.model.Links;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
@Repository
public class LinkRepository {
    @Autowired
    private JdbcOperations jdbcTemplate;

    // Maps result to Links object
    private RowMapper<Links> rowMapper=(ResultSet rs, int row)->{
        Links movie=new Links();
        movie.setMovieId(rs.getInt(1));
        movie.setImdbId(rs.getString(2));
        movie.setTmdbId(rs.getInt(3));
        return movie;
    };

    // get Links for a movieId
    public Links findLinkByMovieId(int id){
        return jdbcTemplate.queryForObject("SELECT * FROM LINKS WHERE movieId = ?", new Object[]{id}, rowMapper);
    }

}