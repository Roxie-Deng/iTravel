// src/main/java/com/example/iTravel/model/POI.java

package com.example.iTravel.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pois")
public class POI {
    @Id
    private String id;
    private String userId;
    private String name;
    private String description;
    private String category;
    private String location;
    private double rating;
    private String imageUrl;
    private byte[] imageBytes;

    // Constructors, getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
