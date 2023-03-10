package com.capstone.backend.repository;

import com.capstone.backend.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // Map SQL Queries to Users objects
    private RowMapper<Users> rowMapper = (ResultSet rs, int rowNum) -> {
        Users use = new Users();
        use.setUserId(rs.getInt(1));
        use.setEmail(rs.getString(2));
        use.setRole(rs.getString(3));
        use.setUserName(rs.getString(4));
        use.setUserPassword(rs.getString(5));
        return use;
    };

    // Get all users
    private final String GET_ALL = "SELECT * FROM demo_users ORDER BY USERID";
    public List<Users> findAll() {
        return jdbcTemplate.query(GET_ALL, rowMapper);
    }

    // Get user with userId
    private final String GET_BY_ID = "SELECT * FROM demo_users WHERE USERID = ?";
    public Users getUserById(int userId) {
        return jdbcTemplate.queryForObject(GET_BY_ID, rowMapper, userId);
    }

    // Get user with userName
    private final String GET_BY_USERNAME = "SELECT * FROM demo_users WHERE USERNAME = ?";
    public Users getByUserName(String userName) {
        return jdbcTemplate.queryForObject(GET_BY_USERNAME, rowMapper, userName);
    }

    // Add new user
    private final String INSERT_USER = "INSERT INTO demo_users (EMAIL, USERNAME, USERPASSWORD, ROLE) VALUES (?, ?, ?, ?)";
    public boolean addUser(Users u) {
        if (jdbcTemplate.update(INSERT_USER, u.getEmail(), u.getUserName(), u.getUserPassword(), u.getRole()) > 0)
            return true;
        else
            return false;
    }

    // Update existing user
    private final String UPDATE_USER = "UPDATE demo_users SET EMAIL = ?, USERNAME = ?, USERPASSWORD = ?, ROLE = ? WHERE USERID = ?";
    public boolean updateUser(int userId, Users u) {
        if (jdbcTemplate.update(UPDATE_USER, u.getEmail(), u.getUserName(), u.getUserPassword(), u.getRole(), u.getUserId()) > 0)
            return true;
        else
            return false;
    }

    // Delete user by userId
    private final String DELETE_USER = "DELETE demo_users WHERE USERID = ?";
    public boolean deleteUser(int userId) {
        if (jdbcTemplate.update(DELETE_USER, userId) > 0)
            return true;
        else
            return false;
    }

    // Register new user
    private String InsertQuery="INSERT INTO demo_users (EMAIL, USERNAME, USERPASSWORD, ROLE) VALUES (?, ?, ?, ?)";
    public boolean register(Users user) {
        return jdbcTemplate.update(InsertQuery, user.getEmail(),user.getUserName(), user.getUserPassword(), user.getRole()) > 0;
    }

}