package com.example.iTravel.controller;

import com.example.iTravel.model.TravelGuide;
import com.example.iTravel.service.TravelGuideService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/guides")
@CrossOrigin(origins = "http://localhost:3000")
public class TravelGuideController {

    @Autowired
    private TravelGuideService travelGuideService;

    @PostMapping("/guide")
    public ResponseEntity<?> saveGuide(@RequestBody TravelGuide guide, HttpServletRequest request) {
        // 添加：从安全上下文中获取当前用户的认证信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 检查用户是否认证
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("User is not authenticated");
        }

        // 打印用户信息进行调试
        System.out.println("Authenticated user: " + authentication.getName());

        // 获取用户ID并设置到指南对象中
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims != null) {
            String userId = claims.getSubject();
            guide.setUserId(userId);
        }

        TravelGuide savedGuide = travelGuideService.saveTravelGuide(guide);
        return ResponseEntity.ok(savedGuide);
    }

    @GetMapping("/user/{userId}")
    public List<TravelGuide> getGuidesByUserId(@PathVariable String userId) {
        return travelGuideService.getGuidesByUserId(userId);
    }
}
