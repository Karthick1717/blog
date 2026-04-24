    package com.example.blog.model;

    import jakarta.persistence.*;
    import lombok.*;

    import java.time.LocalDateTime;

    import java.util.Set;
    @Entity
    @Table(name = "posts")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class Post {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String title;

        @Column(length = 5000)
        private String content;

        private LocalDateTime createdAt;

        private LocalDateTime updatedAt;

        private String image;

        // ✅ REAL AUTHOR RELATION
        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User author;


        @ManyToMany
        @JoinTable(
        name = "post_likes",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
        private Set<User> likedBy;
    }