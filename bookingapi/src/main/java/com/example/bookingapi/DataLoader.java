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
        // Customer names and addresses
        String[][] customerData = {
                {"Alice Johnson", "123 Maple St"},
                {"Bob Smith", "456 Oak Ave"},
                {"Carol Martinez", "789 Pine Rd"},
                {"David Lee", "101 Birch Ln"},
                {"Eva Thompson", "202 Cedar Ct"},
                {"Frank Wilson", "303 Spruce Blvd"},
                {"Grace Kim", "404 Willow Way"},
                {"Henry Patel", "505 Aspen Dr"},
                {"Isla Nguyen", "606 Elm St"},
                {"Jack Chen", "707 Poplar Pl"}
        };

        for (String[] data : customerData) {
            User customer = new User();
            customer.setName(data[0]);
            customer.setRole("customer");
            customer.setAddress(data[1]);
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
