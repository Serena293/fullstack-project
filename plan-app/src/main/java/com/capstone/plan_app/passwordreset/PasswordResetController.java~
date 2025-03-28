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
    private final AuthService userService; // Servizio per la gestione utenti
    private final EmailService emailService; // Servizio per inviare email
    private final PasswordEncoder passwordEncoder; // Per criptare la password

    @PostMapping("/request")
    public ResponseEntity<String> requestPasswordReset(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        AppUsers user = userService.findByEmail(email);

        System.out.println("richiesta password rivetvuta per email: " + email + user);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        String token = tokenService.createPasswordResetToken(user);
        String resetLink = "http://localhost:5173/resetpassword?token=" + token;

        try {
            emailService.sendEmail(user.getEmail(), "Password Reset",
                    "Click the link to reset your password: " + resetLink);
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Error sending email: " + e.getMessage());
        }

        return ResponseEntity.ok("Password reset email sent.");
    }


    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        if (!tokenService.isTokenValid(token)) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        Optional<PasswordResetToken> tokenOptional = tokenService.getToken(token);
        if (tokenOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid token.");
        }

        PasswordResetToken resetToken = tokenOptional.get();
        AppUsers user = userService.findById(resetToken.getAppUsers().getUserId());

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        user.setPassword(passwordEncoder.encode(newPassword)); // Hash della password
        userService.saveUser(user);
        tokenService.deleteToken(token);

        return ResponseEntity.ok("Password has been reset successfully.");
    }
}
