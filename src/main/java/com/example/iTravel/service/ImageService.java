package com.example.iTravel.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

/**
 * ImageService class provides functionality to fetch image URLs from a remote Python backend.
 * */

@Service
public class ImageService {

    // 实例方法
    public String getImageUrl(String query) {
        return fetchImageUrl(query);
    }

    // 静态方法
    public static String fetchImageUrl(String query) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            JSONObject json = new JSONObject();
            json.put("query", query);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("http://127.0.0.1:5000/get_image"))
                    .header("Content-Type", "application/json")
                    .POST(BodyPublishers.ofString(json.toString()))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Response status code: " + response.statusCode());
            System.out.println("Response body: " + response.body());

            if (response.statusCode() == 200) {
                JSONObject responseBody = new JSONObject(response.body());
                return responseBody.getString("image_url");
            } else {
                throw new RuntimeException("Failed to fetch image: " + response.body());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching image URL", e);
        }
    }

//    public static void main(String[] args) {
//        try {
//            String query = "Eiffel Tower";
//            String imageUrl = fetchImageUrl(query);
//            System.out.println("Image URL: " + imageUrl);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
}
