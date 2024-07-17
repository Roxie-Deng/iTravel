package com.example.iTravel.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * ClassName: Role
 * Package: com.example.iTravel.model
 * Description:
 *
 * @Author Yuki
 * @Create 17/07/2024 15:09
 * @Version 1.0
 */
@Data
@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private ERole name;
}
