package org.hirusha.library.Controller;

import lombok.AllArgsConstructor;
import org.hirusha.library.DTO.UserRequest;
import org.hirusha.library.Model.User;
import org.hirusha.library.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserRequest userRequest){
        return ResponseEntity.ok(userService.createUser(userRequest));
    }

    @GetMapping()
    public ResponseEntity<List<User>> viewUsers(){
        return ResponseEntity.ok(userService.viewUsers());
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> viewUserByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.viewUserByUsername(username));
    }
}
