package com.example.iTravel.payload;

import java.util.List;
import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";// Default token type for HTTP Authorization header
    private String id;
    private String username;
    private String email;
    private List<String> roles;
    private String avatarUrl;  // 添加头像URL字段

    public JwtResponse(String accessToken, String id, String username, String email, List<String> roles, String avatarUrl) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.avatarUrl = avatarUrl;  // 初始化头像URL
    }
}
