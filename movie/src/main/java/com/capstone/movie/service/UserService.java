package com.capstone.movie.service;

import com.capstone.movie.model.Users;
import com.capstone.movie.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<Users> getAll() {
        return userRepository.findAll();
    }

    public Users getUserById(int userId) {
        return userRepository.getUserById(userId);
    }

    public String addUser(Users use) {
        String response;

        if (userRepository.addUser(use))
            response = "Successfully added";
        else
            response = "Something went wrong. Not added, please try again";
        return response;
    }

    public String updateUser(int userId, Users use) {
        String response;

        if (userRepository.updateUser(userId, use))
            response = "Successfully updated";
        else
            response = "Something went wrong. Not updated, please try again";
        return response;
    }

    public String deleteUser(int userId) {
        String response;

        if (userRepository.deleteUser(userId))
            response = "Successfully deleted";
        else
            response = "Something went wrong. Not deleted, please try again";
        return response;
    }

    public Users login(String userName, String password) {
        return userRepository.login(userName, password);
    }

}