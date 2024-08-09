package com.example.iTravel.controller;

import com.example.iTravel.model.TravelGuide;
import com.example.iTravel.service.TravelGuideService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/guides")
public class TravelGuideController {

    @Autowired
    private TravelGuideService travelGuideService;

    @PostMapping("/guide")
    public TravelGuide saveGuide(@RequestBody TravelGuide guide, HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null) {
            throw new RuntimeException("User is not authenticated");
        }
        String userId = claims.getSubject();
        guide.setUserId(userId);
        return travelGuideService.saveTravelGuide(guide);
    }

    @GetMapping("/user/{userId}")
    public List<TravelGuide> getGuidesByUserId(@PathVariable String userId) {
        return travelGuideService.getGuidesByUserId(userId);
    }
}
