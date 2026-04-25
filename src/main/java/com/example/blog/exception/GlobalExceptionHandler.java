package com.example.blog.exception;

import com.example.blog.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<String>> handleRuntime(RuntimeException ex) {

        String message = ex.getMessage();

        int status = switch (message) {

            // 🔐 Auth
            case "USER_NOT_FOUND" -> 404;
            case "INVALID_PASSWORD" -> 401;
            case "EMAIL_ALREADY_EXISTS" -> 409;
            case "MISSING_CREDENTIALS" -> 400;
            case "INVALID_REQUEST" -> 400;
            case "TOKEN_GENERATION_FAILED" -> 500;

            // 📝 Post
            case "INVALID_POST_DATA" -> 400;
            case "POST_NOT_FOUND" -> 404;

            // 👤 User
            case "INVALID_USER" -> 400;

            case "INVALID_COMMENT_DATA" -> 400;
            case "INVALID_POST_ID" -> 400;
            case "NO_COMMENTS_FOUND" -> 404;


            // default
            default -> 500;
        };

        return ResponseEntity.status(status).body(
                new ApiResponse<>(status, message, null)
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGeneric(Exception ex) {

        return ResponseEntity.status(500).body(
                new ApiResponse<>(500, "INTERNAL_SERVER_ERROR", null)
        );
    }
}