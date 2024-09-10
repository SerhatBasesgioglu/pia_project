package com.serhat.user.controller;

import com.serhat.user.dto.UserRequest;
import com.serhat.user.dto.UserResponse;
import com.serhat.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getUsers(@RequestParam(required = false) String email,
                                                       @RequestParam(required = false) String name) {
        List<UserResponse> users = userService.getUsers(email, name);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        UserResponse user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }


    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest user) {
        UserResponse createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
