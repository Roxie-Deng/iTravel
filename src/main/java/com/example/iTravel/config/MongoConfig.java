package com.example.iTravel.config;

import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return "test"; // 实际使用的数据库名
    }

    @Bean
    @Override
    public MongoDatabaseFactory mongoDbFactory() {
        // 注意更新 MongoDB 的 URI
        return new SimpleMongoClientDatabaseFactory(MongoClients.create(), getDatabaseName());
    }

    @Bean
    public GridFsTemplate gridFsTemplate() throws Exception {
        MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory());
        return new GridFsTemplate(mongoDbFactory(), mongoTemplate.getConverter());
    }
}
