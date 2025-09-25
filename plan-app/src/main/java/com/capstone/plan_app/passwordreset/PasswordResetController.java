package com.capstone.plan_app.passwordreset;

import com.capstone.plan_app.security.AuthService;
import com.capstone.plan_app.services.EmailService;
import com.capstone.plan_app.user.AppUsers;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/password-reset")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordResetController {

    private final PasswordResetTokenService tokenService;
    private final AuthService userService; // Service for managing users
    private final EmailService emailService; // Service to send emails
    private final PasswordEncoder passwordEncoder; // For encoding passwords

    // Request a password reset by sending a reset link to the user's email
    @PostMapping("/request")
    public ResponseEntity<String> requestPasswordReset(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        AppUsers user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found with email: " + email);
        }

        // Generate reset token and send reset link via email
        String token = tokenService.createPasswordResetToken(user);
        String resetLink = "http://localhost:5173/resetpassword?token=" + token;


            emailService.sendEmail(user.getEmail(), "Password Reset",
                    "Click the link to reset your password: " + resetLink);

        return ResponseEntity.ok("Password reset email sent to: " + email);
    }

    // Reset the password using the reset token and new password
    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        // Validate the reset token
        if (!tokenService.isTokenValid(token)) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        Optional<PasswordResetToken> tokenOptional = tokenService.getToken(token);
        if (tokenOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Token not found.");
        }

        PasswordResetToken resetToken = tokenOptional.get();
        AppUsers user = userService.findById(resetToken.getAppUsers().getUserId());

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found for the provided token.");
        }

        // Encode the new password and save it to the user
        user.setPassword(passwordEncoder.encode(newPassword));
        userService.saveUser(user);

        // Delete the token after successful password reset
        tokenService.deleteToken(token);

        return ResponseEntity.ok("Password has been reset successfully.");
    }
}
