package com.example.bookingapi.controller;

import com.example.bookingapi.model.User;
import com.example.bookingapi.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<User> getAllCustomers() {
        return userRepo.findByRole("customer");
    }

    @PostMapping
    public ResponseEntity<User> createCustomer(@RequestBody User user) {
        user.setRole("customer");
        User saved = userRepo.save(user);
        return ResponseEntity.ok(saved);
    }
}
