package com.example.blog.controller;

import com.example.blog.dto.CommentRequest;
import com.example.blog.model.Comment;
import com.example.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // Add comment
    @PostMapping("/{postId}")
    public Comment addComment(@PathVariable Long postId,
                             @RequestBody CommentRequest request,
                             Principal principal) {

        return commentService.addComment(postId, request, principal.getName());
    }

    // Get comments for a post
    @GetMapping("/{postId}")
    public List<Comment> getComments(@PathVariable Long postId) {
        return commentService.getCommentsByPost(postId);
    }
}