package com.example.blog.controller;

import com.example.blog.dto.ApiResponse;
import com.example.blog.dto.CommentRequest;
import com.example.blog.model.Comment;
import com.example.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // ✅ Add comment
    @PostMapping("/{postId}")
    public ResponseEntity<ApiResponse<Comment>> addComment(
            @PathVariable Long postId,
            @RequestBody CommentRequest request,
            Principal principal) {

        Comment comment = commentService.addComment(postId, request, principal.getName());

        return ResponseEntity.ok(
                new ApiResponse<>(200, "COMMENT_ADDED", comment)
        );
    }

    // ✅ Get comments
    @GetMapping("/{postId}")
    public ResponseEntity<ApiResponse<List<Comment>>> getComments(@PathVariable Long postId) {

        return ResponseEntity.ok(
                new ApiResponse<>(200, "COMMENTS_FETCHED", commentService.getCommentsByPost(postId))
        );
    }
}