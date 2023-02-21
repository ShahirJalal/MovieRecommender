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

    // JDBC_DRIVER, DB_URL, USER, PASS for connecting to Oracle DB
    final String JDBC_DRIVER = "oracle.jdbc.driver.OracleDriver";
    final String DB_URL = "jdbc:oracle:thin:@database-2.cmxecweo1rn2.ap-southeast-1.rds.amazonaws.com:1521:ORCL";
    final String USER = "admin";
    final String PASS = "Password123";

    // Maps data from database to Movies object
    private RowMapper<Movies> rowMapper=(ResultSet rs, int row)->{
        Movies movie=new Movies();
        movie.setMovieId(rs.getInt(1));
        movie.setTitle(rs.getString(2));
        movie.setGenres(rs.getString(3));
        return movie;
    };

    // Add new movie
    public boolean addMovie(Movies movie) {
        String InsertQuery = "INSERT INTO demo_movies (movieId, title, genres) VALUES (?, ?, ?)";
        return jdbcTemplate.update(InsertQuery,movie.getMovieId(), movie.getTitle(), movie.getGenres()) > 0;
    }

    // Get all movies
    public List<Movies> findAll(){
        return jdbcTemplate.query("SELECT * FROM demo_movies ORDER BY movieId DESC FETCH NEXT 100 ROWS ONLY",rowMapper);
    }

    // Get movie by movieId
    public Movies getMovieById(int movieId){
        return jdbcTemplate.queryForObject("SELECT * FROM demo_movies WHERE movieId = ?", new Object[]{movieId}, rowMapper);
    }

    // Get filtered movie by movieId
    public Movies getFilteredMovieById(int movieId){
        try {
            System.out.println();
            return jdbcTemplate.queryForObject("SELECT * FROM demo_movies WHERE movieId = ?", new Object[]{movieId}, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    // Update existing movie
    private String UpdateQuery = "UPDATE  demo_movies SET title = ?, genres = ? WHERE movieId = ?";
    public boolean updateMovie(int movieId,Movies movie){
        return jdbcTemplate.update(UpdateQuery, movie.getTitle(), movie.getGenres(),movieId) > 0;
    }

    // Delete movie by movieId
    private String DeleteQuery = "DELETE demo_movies WHERE movieId = ?";
    public boolean deleteMovie(int movieId) {
        if (jdbcTemplate.update(DeleteQuery, movieId) > 0)
            return true;
        else
            return false;
    }

    // Run SQL query and return a list of results
    public List<String> runQuery(String myQuery, String myColumn){
        Connection conn = null;
        Statement stmt = null;
        List<String> result = new ArrayList<>();
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();

            String sql = myQuery; // Create a statement object for executing SQL queries
            ResultSet rs = stmt.executeQuery(sql); // Execute the given query

            while(rs.next()){ // Loops through the ResultSet and adds the value of the specified column to a list
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

        return result; // Returns the list of column values
    }

    // Get all similar movies to the movieId
    public List<Movies> getSimilarMovies(int id) {
        try {
            List<String> similarIDs = new ArrayList<>(); // Similar List ID
            List<Movies> similarMovies = new ArrayList<>();
            String query = "Select movie_id from pearsons_correlation_medium where ID_" + id + "> 0.5";// Query to get similar IDs
            System.out.println("Query made: " + query);
            similarIDs = runQuery(query, "movie_id"); // Runs the query using a helper method named "runQuery" and stores the resulting list of similar IDs
            System.out.println("Similar IDs: " + similarIDs);
            System.out.println("Number of movies found: " + similarIDs.size());
            for (int j = 0; j < similarIDs.size(); j++) { // Loops through the list of similar movie IDs, retrieving the corresponding movie object from the "movies" table using a helper method named "getFilteredMovieById"
                Movies movie=getFilteredMovieById(Integer.valueOf(similarIDs.get(j)));
                if (movie == null) {
                    continue;
                } else {
                    System.out.println("movie found: " + movie.getMovieId());
                    similarMovies.add(movie);
                }
            }
            System.out.println("return size: " + similarMovies.size());
            return similarMovies;
        } catch (EmptyResultDataAccessException e) {
            e.printStackTrace();
            return null;
        }
    }
}