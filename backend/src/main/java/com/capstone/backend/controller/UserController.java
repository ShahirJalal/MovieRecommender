package com.capstone.backend.controller;

import com.capstone.backend.model.Users;
import com.capstone.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

//    @PostMapping("/login")
//    public ResponseEntity<Users> login(@RequestParam String userName, @RequestParam String userPassword) {
//        Users user = userService.login(userName, userPassword);
//        if (user != null) {
//            return new ResponseEntity<>(user, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//    }

//    @PostMapping("/login")
//    public Users login(@RequestBody Users use) {
//        return userService.login(use.getUserName(), use.getUserPassword());
//    }

    @PostMapping("/login")
    public Users login(@RequestParam("username") String userName, @RequestParam("password") String userPassword) {
        return userService.login(userName, userPassword);
    }

}