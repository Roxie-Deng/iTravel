package com.example.iTravel.controller;

import com.example.iTravel.model.POI;
import com.example.iTravel.service.POIService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/pois")
@CrossOrigin(origins = "http://localhost:3000")
public class POIController {

    @Autowired
    private POIService poiService;

    @PostMapping
    public ResponseEntity<?> addPOI(@RequestBody POI poi, HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null) {
            return ResponseEntity.status(401).body("User is not authenticated");
        }
        String userId = claims.getSubject();
        poi.setUserId(userId);
        POI savedPOI = poiService.savePOI(poi);
        return ResponseEntity.ok(savedPOI);
    }

    @GetMapping("/user/{userId}")
    public List<POI> getPOIsByUserId(@PathVariable String userId) {
        return poiService.getPOIsByUserId(userId);
    }
}