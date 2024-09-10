package com.serhat.user.service;

import com.serhat.user.dto.UserRequest;
import com.serhat.user.dto.UserResponse;
import com.serhat.user.exception.UserAlreadyExistsException;
import com.serhat.user.model.User;
import com.serhat.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserService(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public List<UserResponse> getUsers(String email, String name) {
        List<User> allUsers = (List<User>) userRepository.findAll();
        List<User> filteredUsers = allUsers.stream()
                .filter(user -> email == null || email.isEmpty() || user.getEmail().equals(email))
                .filter(user -> name == null || name.isEmpty() || user.getName().equals(name))
                .toList();
        return filteredUsers.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .toList();
    }

    public List<UserResponse> getUsersByEmail(String email) {
        List<User> userList = userRepository.findByEmail(email);
        return userList.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
    }

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("This id does not exist"));
        return modelMapper.map(user, UserResponse.class);
    }

    public UserResponse createUser(UserRequest user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }
        if (userRepository.existsByName(user.getName())) {
            throw new UserAlreadyExistsException("Name already exists");
        }
        User newUser = modelMapper.map(user, User.class);
        User createdUser = userRepository.save(newUser);
        return modelMapper.map(createdUser, UserResponse.class);
    }

    public void deleteUser(Long id) {
        User user = modelMapper.map(getUser(id), User.class);
        userRepository.delete(user);

    }

}
