package com.example.bookingapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    private User customer;

    @ManyToOne
    private User provider;

    @ManyToOne
    @NotNull
    private ServiceType serviceType;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status;

    // Getters and setters
    public Long getId() { return id; }
    public User getCustomer() { return customer; }
    public User getProvider() { return provider; }
    public ServiceType getServiceType() { return serviceType; }
    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setCustomer(User customer) { this.customer = customer; }
    public void setProvider(User provider) { this.provider = provider; }
    public void setServiceType(ServiceType serviceType) { this.serviceType = serviceType; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(String status) { this.status = status; }
}
