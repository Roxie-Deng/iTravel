package com.example.iTravel.service;

import com.example.iTravel.model.POI;
import com.example.iTravel.repository.POIRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


//Create a service class to implement the recommendation logic
//For simplicity, recommendations only based on category and rating

@Service
public class RecommendationService {

    @Autowired
    private POIRepository poiRepository;

    public List<POI> recommendPOIs(String category, double minRating) {
        List<POI> allPOIs = poiRepository.findAll();
        return allPOIs.stream()
                .filter(poi -> poi.getCategory().equalsIgnoreCase(category) && poi.getRating() >= minRating)
                .collect(Collectors.toList());
    }
}