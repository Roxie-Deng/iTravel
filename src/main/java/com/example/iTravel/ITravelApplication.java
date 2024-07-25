package com.example.iTravel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ITravelApplication {

	public static void main(String[] args) {
		SpringApplication.run(ITravelApplication.class, args);

		SpringApplication app = new SpringApplication(ITravelApplication.class);
		app.setAdditionalProfiles("debug");
		app.run(args);
	}
}
