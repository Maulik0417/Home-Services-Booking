package com.example.bookingapi.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "app_user")  // rename from 'user' to 'app_user'
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Column(nullable = false)
    private String address;


    @NotBlank
    private String role; // e.g., "customer", "provider"

    // Getters and setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getRole() { return role; }
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setRole(String role) { this.role = role; }
}
