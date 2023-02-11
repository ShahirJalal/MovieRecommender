package com.capstone.backend.service;

import com.capstone.backend.model.Users;
import com.capstone.backend.repository.UserRepository;
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

    public Users getByUserName(String userName) {
        return userRepository.getByUserName(userName);
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

    public String register(Users user) {
        String response;

        if (userRepository.register(user))
            response = "Successfully registered";
        else
            response = "Something went wrong. Not registered, please try again";
        return response;
    }

}