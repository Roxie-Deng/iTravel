package com.example.iTravel.travelguide.service;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Service class for interacting with an external API to generate travel guide content.
 * Uses Apache HttpClient to send HTTP requests to the specified API URL.
 */
@Service
public class ApiService {

    @Value("${api.url}")
    private String apiUrl;

    /**
     * Generates travel guide content based on the provided destination by calling the external API.
     * @param destination The destination for which to generate travel guide content.
     * @return The generated content as a String.
     * @throws IOException If an I/O error occurs during the HTTP request.
     */
    public String generateTravelGuideContent(String destination) throws IOException {
        String prompt = "Generate a general travel itinerary for " + destination +
                " based on the current season, outlining activities for each day. Decide the number of days based on your experience (Format: Day 1:..., Day 2:...). List the activities in an itemized format and keep the description under 300 words.";
        String json = "{"
                + "\"prompt\":\"" + prompt + "\","
                + "\"max_tokens\":500"
                + "}";

        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(apiUrl);

        httpPost.setHeader("Content-Type", "application/json");

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);

        CloseableHttpResponse response = httpClient.execute(httpPost);
        String responseBody = EntityUtils.toString(response.getEntity());
        response.close();
        httpClient.close();

        return responseBody;  // Parse responseBody to extract the actual content if necessary
    }
}
