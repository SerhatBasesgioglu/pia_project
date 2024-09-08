package com.serhat.user.repository;

import com.serhat.user.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByName(String name);
}
