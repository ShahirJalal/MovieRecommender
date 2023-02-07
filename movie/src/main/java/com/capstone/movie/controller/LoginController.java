package com.capstone.movie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.movie.model.Users;

@RestController
@RequestMapping("/api/v1/login")
public class LoginController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @PostMapping("/")
    public String login(@RequestBody Users user) {
        String sql = "SELECT count(*) FROM demo_users WHERE userName = ? AND userPassword = ?";
        int count = jdbcTemplate.queryForObject(
                sql, new Object[] { user.getUserName(), user.getUserPassword() }, Integer.class);
        return count > 0 ? "Login successful." : "Invalid credentials.";
    }
}