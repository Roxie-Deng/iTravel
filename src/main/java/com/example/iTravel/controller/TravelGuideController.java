package com.example.iTravel.controller;

import com.example.iTravel.model.TravelGuide;
import com.example.iTravel.service.TravelGuideService;
import com.github.benmanes.caffeine.cache.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/guides")
public class TravelGuideController {

    @Autowired
    private TravelGuideService travelGuideService;

    @Autowired
    private Cache<String, Object> caffeineCache;

    private static final Logger logger = LoggerFactory.getLogger(TravelGuideController.class);

    @GetMapping
    public Object getGuide(@RequestParam String destination, @RequestParam String time) {
        String cacheKey = "guide:" + destination + ":" + time;
        Object cachedGuide = caffeineCache.getIfPresent(cacheKey);

        if (cachedGuide != null) {
            return cachedGuide;
        }

        TravelGuide guide = travelGuideService.getGuideByDestinationAndTime(destination, time);
        if (guide != null) {
            caffeineCache.put(cacheKey, guide);
        }
        return guide;
    }

    @PostMapping
    public TravelGuide saveGuide(@RequestBody TravelGuide guide) {
        logger.info("Received guide: {}", guide);
        return travelGuideService.saveTravelGuide(guide);
    }
}
