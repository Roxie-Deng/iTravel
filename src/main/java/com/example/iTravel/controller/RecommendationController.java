package com.example.iTravel.controller;

import com.example.iTravel.model.POI;
import com.example.iTravel.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Create a controller to expose the recommendation endpoint
@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/poi")
    public List<POI> getRecommendations(@RequestParam String category, @RequestParam double minRating) {
        return recommendationService.recommendPOIs(category, minRating);
    }
}
