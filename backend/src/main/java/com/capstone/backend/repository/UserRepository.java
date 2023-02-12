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

    private final String GET_ALL = "SELECT * FROM demo_users";
    private final String GET_BY_ID = "SELECT * FROM demo_users WHERE USERID = ?";
    private final String INSERT_USER = "INSERT INTO demo_users (USERID, EMAIL, USERNAME, USERPASSWORD) values (?, ?, ?, ?)";
    private final String UPDATE_USER = "UPDATE demo_users set EMAIL = ?, USERNAME = ?, USERPASSWORD = ? WHERE USERID = ?";
    private final String DELETE_USER = "DELETE demo_users WHERE USERID = ?";

    private RowMapper<Users> rowMapper = (ResultSet rs, int rowNum) -> {
        Users use = new Users();
        use.setUserId(rs.getInt(1));
        use.setEmail(rs.getString(2));
        use.setUserName(rs.getString(3));
        use.setUserPassword(rs.getString(4));
        use.setRole(rs.getString(5));
        return use;
    };

    public List<Users> findAll() {
        return jdbcTemplate.query(GET_ALL, rowMapper);
    }

    public Users getUserById(int userId) {
        return jdbcTemplate.queryForObject(GET_BY_ID, rowMapper, userId);
    }

    private final String GET_BY_USERNAME = "SELECT * FROM demo_users WHERE USERNAME = ?";

    public Users getByUserName(String userName) {
        return jdbcTemplate.queryForObject(GET_BY_USERNAME, rowMapper, userName);
    }


    public boolean addUser(Users u) {
        if (jdbcTemplate.update(INSERT_USER, u.getUserId(), u.getEmail(), u.getUserName(), u.getUserPassword()) > 0)
            return true;
        else
            return false;
    }

    public boolean updateUser(int userId, Users u) {
        if (jdbcTemplate.update(UPDATE_USER, u.getEmail(), u.getUserName(), u.getUserPassword(), u.getUserId()) > 0)
            return true;
        else
            return false;
    }

    public boolean deleteUser(int userId) {
        if (jdbcTemplate.update(DELETE_USER, userId) > 0)
            return true;
        else
            return false;
    }

    private String InsertQuery="INSERT INTO demo_users (email, userName, userPassword, role) VALUES (?, ?, ?, ?)";
    public boolean register(Users user) {
        return jdbcTemplate.update(InsertQuery, user.getEmail(),user.getUserName(), user.getUserPassword(), user.getRole()) > 0;
    }

}