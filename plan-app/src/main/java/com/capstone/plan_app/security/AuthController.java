package com.capstone.plan_app.security;

import com.capstone.plan_app.services.EmailService;
import com.capstone.plan_app.user.AppUserDTO;
import com.capstone.plan_app.user.AppUserLoginDTO;
import com.capstone.plan_app.user.AppUsers;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final EmailService emailService;

    public AuthController(AuthService authService, EmailService emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }

    // Endpoint for user registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUserDTO appUserDTO) {
        logger.debug("Registration requested for username: {}", appUserDTO.getUsername());

        String token = (String) authService.register(appUserDTO).getBody();
        logger.debug("Registration token generated: {}", token);

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Token generation failed"));
        }

        // Sending welcome email to the user
        emailService.sendEmail(appUserDTO.getEmail(), "Welcome!", "Thank you for registering!");

        logger.info("Welcome email sent to {}", appUserDTO.getEmail());


        return ResponseEntity.ok(Map.of("token", token, "message", "Registration successful!"));
    }

    // Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AppUserLoginDTO appUserLoginDTO) {
        try {
            String token = authService.login(appUserLoginDTO.getUsername(), appUserLoginDTO.getPassword()).getBody();
            if (token == null || token.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid credentials"));
            }
            return ResponseEntity.ok(Map.of("token", token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred"));
        }
    }


    // Endpoint to get the currently authenticated user
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not authenticated"));
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            AppUsers currentUser = userDetails.getAppUser();
            return ResponseEntity.ok(currentUser);
        } else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid authentication principal"));
        }
    }
}
