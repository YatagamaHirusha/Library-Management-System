package org.hirusha.library.Service;

import lombok.AllArgsConstructor;
import org.hirusha.library.DTO.UserRequest;
import org.hirusha.library.Exception.UserNotFoundException;
import org.hirusha.library.Model.User;
import org.hirusha.library.Repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepo userRepo;

    public User createUser(UserRequest userRequest){
        User user = new User();
        user.setRole(userRequest.role());
        user.setUsername(userRequest.username());
        user.setPassword(userRequest.password());
        return userRepo.save(user);
    }

    public List<User> viewUsers(){
        return userRepo.findAll();
    }

    public User viewUserByUsername(String username){
        return userRepo.findByUsername(username).orElseThrow(UserNotFoundException::new);
    }
}
