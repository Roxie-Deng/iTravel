package com.example.iTravel;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ITravelApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(ITravelApplication.class);
		app.setAdditionalProfiles("debug");
		app.run(args);
	}

	@PostConstruct
	public void init() {
		// 检查环境变量中的 JWT Secret
		System.out.println("Environment JWT Secret: " + System.getenv("YOUR_ENV_JWT_SECRET"));
	}
}
