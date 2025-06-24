package org.hirusha.library.Repository;

import org.hirusha.library.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
