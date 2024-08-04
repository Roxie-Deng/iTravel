package com.example.iTravel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

/**
 * ClassName: ExceptionHandlerController
 * Package: com.example.iTravel.controller
 * Description:
 *
 * @Author Yuki
 * @Create 04/08/2024 22:27
 * @Version 1.0
 */

@RestControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(IOException ex) {
        // 处理特定类型的异常，并返回适当的 HTTP 状态码和消息
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred: " + ex.getMessage());
    }
}
