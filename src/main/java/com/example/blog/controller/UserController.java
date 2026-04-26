package com.example.blog.controller;

import com.example.blog.model.User;
import com.example.blog.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;

    // 👤 GET PROFILE (JWT REQUIRED)
    @GetMapping("/profile")
    public Map<String, String> profile(Principal principal) {

        User user = authService.getProfile(principal.getName());

        return Map.of(
                "username", user.getUsername(),
                "email", user.getEmail()
        );
    }
}