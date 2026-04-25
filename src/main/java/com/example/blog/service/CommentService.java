package com.example.blog.service;

import com.example.blog.dto.CommentRequest;
import com.example.blog.model.Comment;
import com.example.blog.model.Post;
import com.example.blog.model.User;
import com.example.blog.repository.CommentRepository;
import com.example.blog.repository.PostRepository;
import com.example.blog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    // ✅ Add comment
    public Comment addComment(Long postId, CommentRequest request, String email) {

        if (postId == null) {
            throw new RuntimeException("INVALID_POST_ID");
        }

        if (request == null || request.getContent() == null || request.getContent().isBlank()) {
            throw new RuntimeException("INVALID_COMMENT_DATA");
        }

        if (email == null || email.isBlank()) {
            throw new RuntimeException("INVALID_USER");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("USER_NOT_FOUND"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("POST_NOT_FOUND"));

        Comment comment = new Comment();
        comment.setContent(request.getContent().trim());
        comment.setUser(user);
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // ✅ Get comments
    public List<Comment> getCommentsByPost(Long postId) {

        if (postId == null) {
            throw new RuntimeException("INVALID_POST_ID");
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("POST_NOT_FOUND"));

        List<Comment> comments = commentRepository.findByPost(post);

        if (comments == null || comments.isEmpty()) {
            throw new RuntimeException("NO_COMMENTS_FOUND");
        }

        return comments;
    }
}