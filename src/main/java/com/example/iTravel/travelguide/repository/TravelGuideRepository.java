package com.example.iTravel.travelguide.repository;

import com.example.iTravel.travelguide.model.TravelGuide;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing TravelGuide data from MongoDB.
 * Extends MongoRepository to provide CRUD operations on TravelGuide entities.
 */

@Repository
public interface TravelGuideRepository extends MongoRepository<TravelGuide, String> {
}