package com.example.iTravel.controller;

import com.example.iTravel.model.POI;
import com.example.iTravel.repository.POIRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Create an endpoint to add POIs to the MongoDB database.
@RestController
@RequestMapping("/api/pois")
@CrossOrigin(origins = "http://localhost:3000")
public class POIController {

    @Autowired
    private POIRepository poiRepository;

    @PostMapping
    public POI addPOI(@RequestBody POI poi) {
        return poiRepository.save(poi);
    }

    // 修改：新增获取POI接口
    @GetMapping("/{id}")
    public POI getPOI(@PathVariable String id) {
        return poiRepository.findById(id).orElse(null);
    }
}
