package com.example.iTravel.travelguide.service;

import com.example.iTravel.travelguide.model.TravelGuide;
import com.example.iTravel.travelguide.repository.TravelGuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * Service class for handling business logic related to TravelGuide entities.
 * Provides methods to save a new travel guide and retrieve all travel guides.
 */
@Service
public class TravelGuideService {
    @Autowired
    private TravelGuideRepository repository;

    @Autowired
    private ApiService apiService;

    /**
     * Saves a new travel guide to the database.
     * Uses ApiService to generate content for the guide based on its destination.
     * @param travelGuide The TravelGuide entity to be saved.
     * @return The saved TravelGuide entity.
     */
    public TravelGuide saveTravelGuide(TravelGuide travelGuide) {
        String content;
        try {
            content = apiService.generateTravelGuideContent(travelGuide.getDestination());
        } catch (IOException e) {
            e.printStackTrace();
            content = "Error generating content.";
        }
        travelGuide.setContent(content);
        return repository.save(travelGuide);
    }

    /**
     * Retrieves all travel guides from the database.
     * @return A list of all TravelGuide entities.
     */
    public List<TravelGuide> getAllTravelGuides() {
        return repository.findAll();
    }
}
