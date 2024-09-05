package com.example.iTravel.service;

import com.example.iTravel.model.POI;
import com.example.iTravel.repository.POIRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class POIService {

    @Autowired
    private POIRepository poiRepository;

    public POI savePOI(POI poi) {
        return poiRepository.save(poi);
    }

    public List<POI> getPOIsByUserId(String userId) {
        return poiRepository.findByUserId(userId);
    }

    public boolean deletePOIById(String id) {
        try {
            // Convert the String id to ObjectId
            ObjectId objectId = new ObjectId(id);
            // Check if the POI exists before deleting
            if (poiRepository.existsById(objectId.toHexString())) {
                poiRepository.deleteById(objectId.toHexString());
                return true;  // Return true if deleted successfully
            } else {
                return false;  // Return false if the POI does not exist
            }
        } catch (IllegalArgumentException e) {
            // If id cannot be converted to ObjectId, handle the error
            return false;
        }
    }
}
