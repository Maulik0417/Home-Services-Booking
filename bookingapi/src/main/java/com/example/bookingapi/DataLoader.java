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
        // Add customers with addresses
        String[] addresses = {
                "123 Maple St", "456 Oak Ave", "789 Pine Rd", "101 Birch Ln", "202 Cedar Ct",
                "303 Spruce Blvd", "404 Willow Way", "505 Aspen Dr", "606 Elm St", "707 Poplar Pl"
        };

        for (String address : addresses) {
            User customer = new User();
            customer.setName("Customer - " + address);
            customer.setRole("customer");
            customer.setAddress(address);
            userRepo.save(customer);
        }

        // Add a provider
        User provider = new User();
        provider.setName("Jane Smith");
        provider.setRole("provider");
        provider.setAddress("909 Provider Blvd");
        userRepo.save(provider);

        // Add service types
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