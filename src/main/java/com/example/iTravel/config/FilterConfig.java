package com.example.iTravel.config;

import com.example.iTravel.filters.JwtFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Value("${iTravel.app.jwtSecret}")
    private String jwtSecret;

    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilterBean() {
        FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JwtFilter(jwtSecret));  // 传递 jwtSecret 参数
        registrationBean.addUrlPatterns("/api/*"); // 只过滤API请求
        return registrationBean;
    }
}
