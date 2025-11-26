package com.eshop.electronics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshop.electronics.model.User;
import com.eshop.electronics.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            return null;
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        return userRepository.save(newUser);
    }

    public User login(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            User user = userRepository.findByUsername(username).get();
            if (user.getPassword().equals(password)) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public User getUserById(String id) {
        if (userRepository.findById(id).isPresent()) {
            return userRepository.findById(id).get();
        } else {
            return null;
        }
    }

    public User getUserByUsername(String username) {
        if (userRepository.findByUsername(username).isPresent()) {
            return userRepository.findByUsername(username).get();
        } else {
            return null;
        }
    }
}
