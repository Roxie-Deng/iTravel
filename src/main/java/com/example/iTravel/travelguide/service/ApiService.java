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

    @Value("${api.token}")
    private String apiToken; // Ensure this is securely stored

    public String generateTravelGuideContent(String destination) throws IOException {
        String requestBody = "{" +
                "\"model\": \"kimi\"," +
                "\"messages\": [{" +
                "   \"role\": \"user\"," +
                "   \"content\": \"" + destination + "\"" +
                "}]," +
                "\"use_search\": true," +
                "\"stream\": false" +
                "}";

        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(apiUrl);

        httpPost.setHeader("Content-Type", "application/json");
        httpPost.setHeader("Authorization", "Bearer " + apiToken);

        StringEntity entity = new StringEntity(requestBody);
        httpPost.setEntity(entity);

        CloseableHttpResponse response = httpClient.execute(httpPost);
        String responseBody = EntityUtils.toString(response.getEntity());
        response.close();
        httpClient.close();

        return responseBody; // Parse responseBody to extract the actual content if necessary
    }
}
