package com.example.iTravel.model;

import lombok.Data;
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

    private String avatarUrl; // URL for external storage
    private byte[] avatarBytes; // Byte array for storing image data

    // To create a new account (TODO:之后可能和下面的constructor合并，设置默认头像)
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

}
