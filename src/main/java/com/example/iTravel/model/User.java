package com.example.iTravel.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String password; // 将存储加密后的密码
    private String email;
    @DBRef
    private Set<Role> roles = new HashSet<>();

    private ObjectId avatarUrl; // 设置默认头像URL

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatarUrl = new ObjectId("66aff6d2423ccb3b63661fd8");// 设置默认头像URL
    }

}
