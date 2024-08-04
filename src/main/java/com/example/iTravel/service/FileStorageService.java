package com.example.iTravel.service;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileStorageService {

    @Autowired
    private GridFsTemplate gridFsTemplate;

    // 上传文件到 GridFS
    public String addFile(MultipartFile file) throws IOException {
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
        return fileId.toString();
    }

    // 从 GridFS 获取文件
    public GridFSFile getFile(String id) {
        return gridFsTemplate.findOne(new org.springframework.data.mongodb.core.query.Query(
                org.springframework.data.mongodb.core.query.Criteria.where("_id").is(id)
        ));
    }

    // 获取文件资源
    public GridFsResource getFileAsResource(String id) {
        GridFSFile file = getFile(id);
        return gridFsTemplate.getResource(file);
    }
}
