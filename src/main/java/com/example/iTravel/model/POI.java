package com.example.iTravel.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

//clarify the data structure in MongoDB
@Data
@Document(collection = "pois")
public class POI {
    @Id
    private String id;
    private String name;
    private String description;
    private String category;
    private String location;
    private double rating;
}
