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
        // Create and save some users
        User customer = new User();
        customer.setName("John Doe");
        customer.setRole("customer");  // <-- Important: role must not be blank
        userRepo.save(customer);

        User provider = new User();
        provider.setName("Jane Smith");
        provider.setRole("provider");  // <-- Example role for service provider
        userRepo.save(provider);

        // Create and save some service types
        ServiceType cleaning = new ServiceType();
        cleaning.setName("Cleaning");
        serviceRepo.save(cleaning);

        ServiceType plumbing = new ServiceType();
        plumbing.setName("Plumbing");
        serviceRepo.save(plumbing);
    }
}
