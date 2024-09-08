package com.serhat.user.Model;

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

}
