package com.example.iTravel.repository;

import com.example.iTravel.model.POI;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface POIRepository extends MongoRepository<POI, String> {
    List<POI> findByCategoryIn(List<String> categories);
    List<POI> findByUserId(String userId); // 根据用户ID查找POI
}
