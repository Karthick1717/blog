package com.example.blog.controller;

import com.example.blog.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{postId}")
    public String likePost(@PathVariable Long postId,
                           Principal principal) {

        return likeService.toggleLike(postId, principal.getName());
    }
}