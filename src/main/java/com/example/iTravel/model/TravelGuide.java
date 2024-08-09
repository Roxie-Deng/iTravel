// src/main/java/com/example/iTravel/model/TravelGuide.java

package com.example.iTravel.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "travel_guides")
public class TravelGuide {
    @Id
    private String id;
    private String userId;
    private String destination;
    private String time;
    private String guide;

    // Constructors, getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
