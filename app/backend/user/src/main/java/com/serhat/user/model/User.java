package com.serhat.user.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name= "\"user\"" )
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

}
