package com.example.iTravel.repository;

import com.example.iTravel.model.TravelGuide;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TravelGuideRepository extends MongoRepository<TravelGuide, String> {
    Optional<TravelGuide> findByDestinationAndTime(String destination, String time);
}
