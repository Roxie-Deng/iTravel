package com.example.iTravel.service;

import com.example.iTravel.model.TravelGuide;
import com.example.iTravel.repository.TravelGuideRepository;
import org.bson.types.ObjectId;
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

    public boolean deleteTravelGuideById(String id) {
        try {
            // Convert the String id to ObjectId
            ObjectId objectId = new ObjectId(id);
            // Check if the Guide exists before deleting
            if (travelGuideRepository.existsById(objectId.toHexString())) {
                travelGuideRepository.deleteById(objectId.toHexString());
                return true;  // Return true if deleted successfully
            } else {
                return false;  // Return false if the Guide does not exist
            }
        } catch (IllegalArgumentException e) {
            // If id cannot be converted to ObjectId, handle the error
            return false;
        }
    }
}
