package com.example.blog.service;

import com.example.blog.model.Post;
import com.example.blog.model.User;
import com.example.blog.repository.PostRepository;
import com.example.blog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public String toggleLike(Long postId, String email) {

        if (postId == null) {
            throw new RuntimeException("INVALID_POST_ID");
        }

        if (email == null || email.isBlank()) {
            throw new RuntimeException("INVALID_USER");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("USER_NOT_FOUND"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("POST_NOT_FOUND"));

        if (post.getLikedBy() == null) {
            throw new RuntimeException("LIKE_COLLECTION_NOT_INITIALIZED");
        }

        boolean alreadyLiked = post.getLikedBy().contains(user);

        if (alreadyLiked) {
            post.getLikedBy().remove(user);
            postRepository.save(post);
            return "UNLIKED";
        } else {
            post.getLikedBy().add(user);
            postRepository.save(post);
            return "LIKED";
        }
    }
}