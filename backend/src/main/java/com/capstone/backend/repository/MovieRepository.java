package com.capstone.backend.repository;

import com.capstone.backend.model.Movies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public  class MovieRepository {
    @Autowired
    private JdbcOperations jdbcTemplate;

    private String RateMovie = "INSERT INTO ratings (userId, movieId, rating, timeStamp) VALUES (?, ?, ?, ?)";

    final String JDBC_DRIVER = "oracle.jdbc.driver.OracleDriver";
    final String DB_URL = "jdbc:oracle:thin:@database-2.cmxecweo1rn2.ap-southeast-1.rds.amazonaws.com:1521:ORCL";
    final String USER = "admin";
    final String PASS = "Password123";

    private RowMapper<Movies> rowMapper=(ResultSet rs, int row)->{
        Movies movie=new Movies();
        movie.setMovieId(rs.getInt(1));
        movie.setTitle(rs.getString(2));
        movie.setGenres(rs.getString(3));
        return movie;
    };

    public List<Movies> findAll(){
        return jdbcTemplate.query("SELECT * FROM demo_movies ORDER BY movieId DESC FETCH NEXT 100 ROWS ONLY",rowMapper);
    }

    public boolean addMovie(Movies movie) {
        String InsertQuery = "INSERT INTO demo_movies (title, genres, poster) VALUES (?, ?, ?)";
        return jdbcTemplate.update(InsertQuery, movie.getTitle(), movie.getGenres(), movie.getPoster()) > 0;
    }

    private String UpdateQuery = "UPDATE  demo_movies SET title = ?, genres = ? WHERE movieId = ?";
    public boolean updateMovie(int movieId,Movies movie){
        return jdbcTemplate.update(UpdateQuery, movie.getTitle(), movie.getGenres(),movieId) > 0;
    }
    public Movies getMovieById(int movieId){
        return jdbcTemplate.queryForObject("SELECT * FROM demo_movies WHERE movieId = ?", new Object[]{movieId}, rowMapper);
    }
    public Movies getFilteredMovieById(int movieId){
        try {
            System.out.println();
            return jdbcTemplate.queryForObject("SELECT * FROM demo_movies WHERE movieId = ?", new Object[]{movieId}, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    private String DeleteQuery = "DELETE demo_movies WHERE movieId = ?";
    public boolean deleteMovie(int movieId) {
        if (jdbcTemplate.update(DeleteQuery, movieId) > 0)
            return true;
        else
            return false;
    }

    public List<String> runQuery(String myQuery, String myColumn){
        Connection conn = null;
        Statement stmt = null;
        List<String> result = new ArrayList<>();
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();

            String sql = myQuery;
            ResultSet rs = stmt.executeQuery(sql);

            while(rs.next()){
                result.add(rs.getString(myColumn));
            }
            rs.close();


        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    conn.close();
            } catch (SQLException se) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }

        return result;
    }

    public List<Movies> getSimilarMovies(int id) {
        try {
            List<String> similarIDs = new ArrayList<>(); //SIMILAR LIST ID
            List<Movies> similarMovies = new ArrayList<>();
            String query = "Select movie_id from pearsons_correlation_medium where ID_" + id + "> 0.5";//QUERY TO GET SIMILAR IDs
            System.out.println("Query made: " + query);
            similarIDs = runQuery(query, "movie_id");
            System.out.println("Similar IDs: " + similarIDs);
            System.out.println("Number of movies found: " + similarIDs.size());
            for (int j = 0; j < similarIDs.size(); j++) {
                Movies movie=getFilteredMovieById(Integer.valueOf(similarIDs.get(j)));
                if (movie == null) {
//                    System.out.println("movie null: " + movie.getTitle());
                    continue;
                } else {
                    System.out.println("movie found: " + movie.getMovieId());
                    similarMovies.add(movie);
                }
//                similarMovies.add(movie);
            }
            System.out.println("return size: " + similarMovies.size());
            return similarMovies;
        } catch (EmptyResultDataAccessException e) {
            e.printStackTrace();
            return null;
        }
    }
}