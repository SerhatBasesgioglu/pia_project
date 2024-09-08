package com.serhat.user.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String email;
    private String name;
    private String password;
}
