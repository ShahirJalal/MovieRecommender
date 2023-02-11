package com.capstone.backend.controller;

import com.capstone.backend.model.Users;
import com.capstone.backend.service.UserService;
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

    @GetMapping("/getByUserName/{userName}")
    public Users getByUserName(@PathVariable("userName") String userName) {
        return userService.getByUserName(userName);
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
    public ResponseEntity<?> login(@RequestBody Users user) {
        Users userdata = userService.getByUserName(user.getUserName()); //VERIFY IS USER EXISTS
        if(userdata != null) {
            if(user.getUserPassword().equals(userdata.getUserPassword())) {
                return new ResponseEntity<Users>(userdata, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Wrong Password", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("User does not exist!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public String register(@RequestBody Users user) {
        return userService.register(user);
    }

}