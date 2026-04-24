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

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (post.getLikedBy().contains(user)) {
            post.getLikedBy().remove(user);
            postRepository.save(post);
            return "Unliked";
        } else {
            post.getLikedBy().add(user);
            postRepository.save(post);
            return "Liked";
        }
    }
}