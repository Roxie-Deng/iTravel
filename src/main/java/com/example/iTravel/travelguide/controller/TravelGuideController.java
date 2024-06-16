package com.example.iTravel.travelguide.controller;

import com.example.iTravel.travelguide.model.TravelGuide;
import com.example.iTravel.travelguide.service.TravelGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing TravelGuide entities.
 * Provides endpoints to create a new travel guide and retrieve all travel guides.
 */
@RestController
@RequestMapping("/api/travel-guide")
public class TravelGuideController {

    @Autowired
    private TravelGuideService service;

    /**
     * Endpoint to create a new travel guide.
     * Accepts a TravelGuide entity in the request body and returns the saved entity.
     * @param travelGuide The TravelGuide entity to be created.
     * @return The created TravelGuide entity.
     */
    @PostMapping
    public TravelGuide createTravelGuide(@RequestBody TravelGuide travelGuide) {
        return service.saveTravelGuide(travelGuide);
    }

    /**
     * Endpoint to retrieve all travel guides.
     * @return A list of all TravelGuide entities.
     */
    @GetMapping
    public List<TravelGuide> getAllTravelGuides() {
        return service.getAllTravelGuides();
    }
}
