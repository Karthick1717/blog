package com.example.blog.controller;

import com.example.blog.dto.ApiResponse;
import com.example.blog.dto.PostRequest;
import com.example.blog.model.Post;
import com.example.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<ApiResponse<Post>> createPost(@RequestBody PostRequest request,
                                                         Principal principal) {

        Post post = postService.createPost(request, principal.getName());

        return ResponseEntity.ok(
                new ApiResponse<>(200, "Post created successfully", post)
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Post>>> getAllPosts() {

        return ResponseEntity.ok(
                new ApiResponse<>(200, "All posts fetched", postService.getAllPosts())
        );
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<Post>>> getMyPosts(Principal principal) {

        return ResponseEntity.ok(
                new ApiResponse<>(200, "Your posts fetched", postService.getMyPosts(principal.getName()))
        );
    }
}