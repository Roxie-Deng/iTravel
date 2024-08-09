package com.example.iTravel.service;

import com.example.iTravel.model.POI;
import com.example.iTravel.repository.POIRepository;
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
}
