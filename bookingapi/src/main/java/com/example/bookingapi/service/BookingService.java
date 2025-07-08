package com.example.bookingapi.service;

import com.example.bookingapi.model.Booking;
import com.example.bookingapi.model.User;
import com.example.bookingapi.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public boolean hasConflict(User provider, LocalDateTime start, LocalDateTime end) {
        List<Booking> overlaps = bookingRepository.findByProviderAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                provider, end, start);
        return !overlaps.isEmpty();
    }

    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }
}
