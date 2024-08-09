package com.example.iTravel.service;

import com.example.iTravel.model.TravelGuide;
import com.example.iTravel.repository.TravelGuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TravelGuideService {

    @Autowired
    private TravelGuideRepository travelGuideRepository;

    public TravelGuide getGuideByDestinationAndTime(String destination, String time) {
        return travelGuideRepository.findByDestinationAndTime(destination, time).orElse(null);
    }

    public TravelGuide saveTravelGuide(TravelGuide guide) {
        return travelGuideRepository.save(guide);
    }

    public List<TravelGuide> getGuidesByUserId(String userId) {
        return travelGuideRepository.findByUserId(userId);
    }
}
