package com.example.blog.controller;

import com.example.blog.dto.PostRequest;
import com.example.blog.model.Post;
import com.example.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // Create Post (SECURED)
    @PostMapping
    public Post createPost(@RequestBody PostRequest request,
                           Principal principal) {
            System.out.println("Incoming email: " + principal.getName());

        return postService.createPost(request, principal.getName());
    }

    // Get all posts (public after login)
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // My posts
    @GetMapping("/my")
    public List<Post> getMyPosts(Principal principal) {
        return postService.getMyPosts(principal.getName());
    }
}