package com.example.iTravel.controller;

import com.example.iTravel.model.POI;
import com.example.iTravel.repository.POIRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:3000")
public class RecommendationController {

    @Autowired
    private POIRepository poiRepository;

    @GetMapping("/poi")
    public List<POI> getRecommendations(@RequestParam String category) {
        // 将类别参数分割为列表
        List<String> categories = Arrays.asList(category.split(","));
        // 调试信息
        System.out.println("Categories: " + categories);

        // 使用自定义查询方法筛选数据
        List<POI> results = poiRepository.findByCategoryIn(categories);
        // 调试信息
        System.out.println("Results: " + results);

        return results;
    }
}
