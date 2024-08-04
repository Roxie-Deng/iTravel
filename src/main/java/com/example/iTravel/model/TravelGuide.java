package com.example.iTravel.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "travel_guides")
public class TravelGuide {
    @Id
    private String id;
    private String destination;
    private String guide;
    private String time;
    private String description;

    // Constructors, getters, and setters

    public TravelGuide() {
    }

    public TravelGuide(String destination, String guide, String time, String description) {
        this.destination = destination;
        this.guide = guide;
        this.time = time;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getGuide() {
        return guide;
    }

    public void setGuide(String guide) {
        this.guide = guide;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
