package com.example.iTravel.service;

import com.example.iTravel.model.TravelGuide;
import com.example.iTravel.repository.TravelGuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelGuideService {

    @Autowired
    private TravelGuideRepository repository;

    public TravelGuide saveTravelGuide(TravelGuide travelGuide) {
        return repository.save(travelGuide);
    }

    public List<TravelGuide> getAllTravelGuides() {
        return repository.findAll();
    }

    public TravelGuide getGuideByDestinationAndTime(String destination, String time) {
        return repository.findByDestinationAndTime(destination, time).orElse(null);
    }
}
