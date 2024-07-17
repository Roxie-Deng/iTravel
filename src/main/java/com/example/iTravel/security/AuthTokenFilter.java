package com.example.iTravel.security;

import java.io.IOException;

import com.example.iTravel.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);// 从请求中解析JWT
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) { // 验证JWT是否有效
                String username = jwtUtils.getUserNameFromJwtToken(jwt);// 从JWT中获取用户名

                UserDetails userDetails = userDetailsService.loadUserByUsername(username); // 加载用户详细信息
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());// 创建认证token
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));// 设置认证详情

                SecurityContextHolder.getContext().setAuthentication(authentication);// 在SecurityContext中设置认证信息
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request);// 从Cookie中获取JWT
        return jwt;
    }
}