package com.capstone.plan_app.security;

import com.capstone.plan_app.services.EmailService;
import com.capstone.plan_app.user.AppUserDTO;
import com.capstone.plan_app.user.AppUsers;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final EmailService emailService; // Aggiunto il servizio email

    public AuthController(AuthService authService, EmailService emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUserDTO appUserDTO) {
        logger.debug("Registrazione richiesta per username: {}", appUserDTO.getUsername());

        String token = authService.register(appUserDTO).getBody();
        logger.debug("Token generato per registrazione: {}", token);

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Token non generato"));
        }

        // 📧 INVIO EMAIL DI BENVENUTO
        try {
            String subject = "Benvenuto su PlanApp!";
            String body = "<h1>Ciao " + appUserDTO.getFirstName() + ", benvenuto su PlanApp! 🎉</h1>"
                    + "<p>Siamo felici di averti con noi. Inizia subito a organizzare i tuoi task!</p>";

            emailService.sendEmail(appUserDTO.getEmail(), subject, body);
            logger.info("Email di benvenuto inviata a {}", appUserDTO.getEmail());
        } catch (MessagingException e) {
            logger.error("Errore nell'invio dell'email a {}", appUserDTO.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Registrazione completata, ma errore nell'invio dell'email"));
        }

        return ResponseEntity.ok(Map.of("token", token, "message", "Registrazione completata con successo!"));
    }
}
