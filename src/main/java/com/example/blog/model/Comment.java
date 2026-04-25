package com.example.blog.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "comments") // ✅ FIXED
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private LocalDateTime createdAt;
    
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"posts", "comments", "email", "password"})
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
     
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    @JsonIgnore
    private Post post;
}