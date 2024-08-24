package com.example.iTravel.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;
    @Value("${spring.data.mongodb.database}")
    private String databaseName;

    @Override
    protected String getDatabaseName() {
        if (databaseName == null || databaseName.isEmpty()) {
            throw new IllegalArgumentException("Database name must be specified in the configuration file.");
        }
        return databaseName;
    }

    @Override
    public MongoClient mongoClient() {
        return MongoClients.create(mongoUri); // 使用配置文件中的 URI 创建 MongoClient
    }

    @Bean
    @Override
    public MongoDatabaseFactory mongoDbFactory() {
        return new SimpleMongoClientDatabaseFactory(mongoClient(), getDatabaseName());
    }

    @Bean
    public GridFsTemplate gridFsTemplate() throws Exception {
        MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory());
        return new GridFsTemplate(mongoDbFactory(), mongoTemplate.getConverter());
    }
}
