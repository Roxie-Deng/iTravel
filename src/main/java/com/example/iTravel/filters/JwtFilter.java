package com.example.iTravel.filters;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.print.attribute.standard.DialogOwner;
import java.io.IOException;
import java.security.Key;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class JwtFilter implements Filter {

    private final String jwtSecret;
    private final Key key;

    public JwtFilter(@Value("${iTravel.app.jwtSecret}") String jwtSecret) {
        this.jwtSecret = jwtSecret;
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        System.out.println("Loaded JWT Secret in JwtFilter: " + jwtSecret);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String path = httpRequest.getRequestURI();

        // 公开路径
        Set<String> openPaths = new HashSet<>(Arrays.asList(PublicPaths.PATHS));

        if (openPaths.stream().anyMatch(path::startsWith)) {
            chain.doFilter(request, response);
            return;
        }

        //需验证路径
        String authorizationHeader = httpRequest.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Please log in");
            return;
        }

        String token = authorizationHeader.substring(7);
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(this.key)  // 使用统一的密钥生成方式
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            httpRequest.setAttribute("claims", claims);
            System.out.println("JWT claims: " + claims);
        } catch (Exception e) {
            System.out.println("JWT validation failed: " + e.getMessage());
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized access");
            return;
        }

        chain.doFilter(request, response);
    }
}