package com.example.bookingapi.repository;

import com.example.bookingapi.model.Booking;
import com.example.bookingapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;



public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
            User provider, LocalDateTime end, LocalDateTime start);
}
