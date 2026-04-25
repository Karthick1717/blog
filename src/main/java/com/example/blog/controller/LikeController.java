package com.example.blog.controller;

import com.example.blog.dto.ApiResponse;
import com.example.blog.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{postId}")
    public ResponseEntity<ApiResponse<String>> likePost(
            @PathVariable Long postId,
            Principal principal) {

        if (principal == null || principal.getName() == null) {
            throw new RuntimeException("INVALID_USER");
        }

        String result = likeService.toggleLike(postId, principal.getName());

        return ResponseEntity.ok(
                new ApiResponse<>(200, result, null)
        );
    }
}