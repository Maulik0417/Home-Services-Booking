package com.example.bookingapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BookingapiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookingapiApplication.class, args);
    }

    // 👇 CORS configuration allowing frontend to access backend
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:3000",
                                "https://homeservicebooking-mann.web.app"
                        )

                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}
