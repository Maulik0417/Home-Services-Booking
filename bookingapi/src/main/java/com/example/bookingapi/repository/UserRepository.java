package com.example.bookingapi.repository;

import com.example.bookingapi.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
