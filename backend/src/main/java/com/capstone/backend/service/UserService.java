package com.capstone.backend.service;

import com.capstone.backend.model.Users;
import com.capstone.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    // Get all users
    public List<Users> getAll() {
        return userRepository.findAll();
    }

    // Get user with userId
    public Users getUserById(int userId) {
        return userRepository.getUserById(userId);
    }

    // Get user with userName
    public Users getByUserName(String userName) {
        return userRepository.getByUserName(userName);
    }

    // Add new user
    public String addUser(Users use) {
        String response;

        if (userRepository.addUser(use))
            response = "Successfully added";
        else
            response = "Something went wrong. Not added, please try again";
        return response;
    }

    // Update existing user
    public String updateUser(int userId, Users use) {
        String response;

        if (userRepository.updateUser(userId, use))
            response = "Successfully updated";
        else
            response = "Something went wrong. Not updated, please try again";
        return response;
    }

    // Delete user by userId
    public String deleteUser(int userId) {
        String response;

        if (userRepository.deleteUser(userId))
            response = "Successfully deleted";
        else
            response = "Something went wrong. Not deleted, please try again";
        return response;
    }

    // Verifies user login
    public ResponseEntity<?> login(Users user) {
        Users userdata = userRepository.getByUserName (user.getUserName()); //VERIFY IS USER EXISTS
        if(userdata != null)
        {
            if(user.getUserPassword ().equals(userdata.getUserPassword ()))
            {
                return new ResponseEntity<Users> (userdata, HttpStatus.OK);
            }
            else
            {
                return new ResponseEntity<> ("Wrong Password", HttpStatus.BAD_REQUEST);
            }
        }
        else
        {
            return new ResponseEntity<>(  "User does not exist!", HttpStatus.BAD_REQUEST);
        }
    }

    // Register new user
    public boolean register(Users user) {
        return userRepository.register(user);
    }

}