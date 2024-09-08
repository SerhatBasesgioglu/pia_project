package com.serhat.user.Controller;

import com.serhat.user.Service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService){
        this.userService = userService;

    }
    @GetMapping("/test")
    public String sayHello(){
        return userService.sayHello();
    }
}
