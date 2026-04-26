package com.example.blog.service;

import com.example.blog.dto.LoginRequest;
import com.example.blog.dto.RegisterRequest;
import com.example.blog.model.User;
import com.example.blog.repository.UserRepository;
import com.example.blog.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ✅ REGISTER
    public String register(RegisterRequest request) {

        // ❌ null check
        if (request == null) {
            throw new RuntimeException("INVALID_REQUEST");
        }

        // ❌ blank fields check
        if (isBlank(request.getUsername())
                || isBlank(request.getEmail())
                || isBlank(request.getPassword())) {
            throw new RuntimeException("MISSING_FIELDS");
        }

        // ❌ email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("EMAIL_ALREADY_EXISTS");
        }

        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "USER_REGISTERED";
    }

    // ✅ LOGIN
    public String login(LoginRequest request) {

        if (request == null) {
            throw new RuntimeException("INVALID_REQUEST");
        }

        if (isBlank(request.getEmail()) || isBlank(request.getPassword())) {
            throw new RuntimeException("MISSING_CREDENTIALS");
        }

        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("USER_NOT_FOUND"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("INVALID_PASSWORD");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        if (token == null || token.isBlank()) {
            throw new RuntimeException("TOKEN_GENERATION_FAILED");
        }

        return token;
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("USER_NOT_FOUND"));
    }


    // ✅ helper
    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}