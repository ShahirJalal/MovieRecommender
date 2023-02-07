package com.capstone.movie.controller;

import com.capstone.movie.model.Users;
import com.capstone.movie.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/getAll")
    public List<Users> getAll() {
        return userService.getAll();
    }

    @GetMapping("/getUserById/{userId}")
    public Users getUserById(@PathVariable("userId") int userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("/addUser")
    public String addUser(@RequestBody Users use) {
        return userService.addUser(use);
    }

    @PutMapping("/updateUser/{userId}")
    public String updateUser(@PathVariable int userId, @RequestBody Users use) {
        return userService.updateUser(userId, use);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public String deleteUser(@PathVariable("userId") int userId) {
        return userService.deleteUser(userId);
    }

    @PostMapping("/login")
    public ResponseEntity<Users> login(@RequestParam String userName, @RequestParam String password) {
        Users user = userService.login(userName, password);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}