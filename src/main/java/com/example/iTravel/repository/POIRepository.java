package com.example.iTravel.repository;

import com.example.iTravel.model.POI;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

//Create a repository interface for POIs to interact with MongoDB
@Repository
public interface POIRepository extends MongoRepository<POI, String> {
    // Custom query methods can be defined here if needed
}
