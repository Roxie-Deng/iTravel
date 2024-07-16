package com.example.iTravel.controller;

import com.example.iTravel.model.POI;
import com.example.iTravel.repository.POIRepository;
import com.example.iTravel.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:3000")
public class RecommendationController {

    @Autowired
    private POIRepository poiRepository;

    @Autowired
    private ImageService imageService;

    @GetMapping("/poi")
    public List<POI> getRecommendations(@RequestParam String category) {
        List<String> categories = Arrays.asList(category.split(","));
        System.out.println("Categories: " + categories);

        List<POI> results = poiRepository.findByCategoryIn(categories);
        System.out.println("Results: " + results);

        results = results.stream().map(poi -> {
            String imageUrl = imageService.getImageUrl(poi.getName());
            poi.setImageUrl(imageUrl);
            return poi;
        }).collect(Collectors.toList());

        return results;
    }
}