package com.example.bookingapi.controller;

import com.example.bookingapi.model.*;
import com.example.bookingapi.repository.*;
import com.example.bookingapi.service.BookingService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final ServiceTypeRepository serviceRepo;

    public BookingController(
            BookingService bookingService,
            BookingRepository bookingRepo,
            UserRepository userRepo,
            ServiceTypeRepository serviceRepo
    ) {
        this.bookingService = bookingService;
        this.bookingRepo = bookingRepo;
        this.userRepo = userRepo;
        this.serviceRepo = serviceRepo;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingRepo.findAll();
        System.out.println("Bookings found: " + bookings.size());
        return bookings;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Booking booking) {
        var customer = userRepo.findById(booking.getCustomer().getId());
        var serviceType = serviceRepo.findById(booking.getServiceType().getId());

        if (customer.isEmpty() || serviceType.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user or service");
        }

        booking.setCustomer(customer.get());
        booking.setServiceType(serviceType.get());
        booking.setStatus("pending");

        Booking saved = bookingService.save(booking);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (!bookingRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        bookingRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // New method to update booking
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingRepo.findById(id)
                .map(booking -> {
                    booking.setDescription(updatedBooking.getDescription());
                    booking.setStartTime(updatedBooking.getStartTime());
                    booking.setEndTime(updatedBooking.getEndTime());
                    Booking saved = bookingRepo.save(booking);
                    return ResponseEntity.ok(saved);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
