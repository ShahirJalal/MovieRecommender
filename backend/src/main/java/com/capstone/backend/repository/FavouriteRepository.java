package com.capstone.backend.repository;

import com.capstone.backend.model.Favourites;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class FavouriteRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Favourites> rowMapper=(ResultSet rs, int row)->{
        Favourites favourite=new Favourites();
        favourite.setFavouriteId(rs.getInt("favouriteid"));
        favourite.setMovieId(rs.getInt("movieid"));
        favourite.setTitle(rs.getString("title"));
        favourite.setGenres(rs.getString("genres"));
        favourite.setUserId(rs.getInt("userid"));
        return favourite;
    };

    public boolean addFavourite(Favourites favourite) {
        String INSERT_FAVOURITE = "INSERT INTO demo_favourites (movieId, title, genres, userId) VALUES (?,?,?,?)";
        jdbcTemplate.update(INSERT_FAVOURITE, favourite.getMovieId(), favourite.getTitle(), favourite.getGenres(), favourite.getUserId());
        return false;
    }

    public List<Favourites> getAll() {
        String SELECT_ALL = "SELECT * FROM demo_favourites ORDER BY userId ASC";
        return jdbcTemplate.query(SELECT_ALL, rowMapper);
    }

    public List<Favourites> getFavouriteById(int userId) {
        String SELECT_BY_ID = "SELECT * FROM demo_favourites WHERE userId = ?";
        return jdbcTemplate.query(SELECT_BY_ID, new Object[] {userId}, rowMapper);
    }

    public boolean deleteFavourite(int favouriteId) {
        String DELETE_FAVOURITE = "DELETE FROM demo_favourites WHERE favouriteId = ?";
        if (jdbcTemplate.update(DELETE_FAVOURITE, favouriteId) > 0)
            return true;
        else
            return false;
    }

}