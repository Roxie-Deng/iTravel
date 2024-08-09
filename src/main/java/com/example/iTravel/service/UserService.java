package com.example.iTravel.service;

import com.example.iTravel.model.POI;
import com.example.iTravel.model.TravelGuide;
import com.example.iTravel.repository.POIRepository;
import com.example.iTravel.repository.TravelGuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private TravelGuideRepository travelGuideRepository;

    @Autowired
    private POIRepository poiRepository;

    public List<TravelGuide> getUserGuides(String userId) {
        return travelGuideRepository.findByUserId(userId);
    }

    public List<POI> getUserPOIs(String userId) {
        return poiRepository.findByUserId(userId);
    }
}
