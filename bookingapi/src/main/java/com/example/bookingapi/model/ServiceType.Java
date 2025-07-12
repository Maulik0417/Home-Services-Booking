package com.example.bookingapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Constructors
    public ServiceType() {}

    public ServiceType(String name) {
        this.name = name;
    }

    // Getters and setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
}
