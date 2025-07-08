package com.example.bookingapi.controller;

import com.example.bookingapi.model.ServiceType;
import com.example.bookingapi.repository.ServiceTypeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-types")
public class ServiceController {

    private final ServiceTypeRepository serviceTypeRepo;

    public ServiceController(ServiceTypeRepository serviceTypeRepo) {
        this.serviceTypeRepo = serviceTypeRepo;
    }

    @GetMapping
    public List<ServiceType> getAllServiceTypes() {
        return serviceTypeRepo.findAll();
    }
}
