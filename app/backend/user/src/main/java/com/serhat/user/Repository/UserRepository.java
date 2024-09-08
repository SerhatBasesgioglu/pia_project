package com.serhat.user.Repository;

import com.serhat.user.Model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
