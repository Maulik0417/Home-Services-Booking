package com.example.bookingapi;

import com.example.bookingapi.model.User;
import com.example.bookingapi.model.ServiceType;
import com.example.bookingapi.repository.UserRepository;
import com.example.bookingapi.repository.ServiceTypeRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepo;
    private final ServiceTypeRepository serviceRepo;

    public DataLoader(UserRepository userRepo, ServiceTypeRepository serviceRepo) {
        this.userRepo = userRepo;
        this.serviceRepo = serviceRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create 10 customers with unique addresses
        for (int i = 1; i <= 10; i++) {
            User customer = new User();
            customer.setAddress("123" + i + " Maple St, Cityville, CA");
            customer.setRole("customer");
            userRepo.save(customer);
        }

        // Optionally add some providers as well
        User provider = new User();
        provider.setAddress("456 Oak Ave, Cityville, CA");
        provider.setRole("provider");
        userRepo.save(provider);

        // Add service types as before
        serviceRepo.save(new ServiceType("Cleaning"));
        serviceRepo.save(new ServiceType("Plumbing"));
        serviceRepo.save(new ServiceType("Electrical"));
        serviceRepo.save(new ServiceType("Painting"));
        serviceRepo.save(new ServiceType("Appliance Repair"));
        serviceRepo.save(new ServiceType("Lawn Care"));
        serviceRepo.save(new ServiceType("Roofing"));
        serviceRepo.save(new ServiceType("Window Washing"));
        serviceRepo.save(new ServiceType("Carpet Cleaning"));
        serviceRepo.save(new ServiceType("HVAC Maintenance"));
    }
}