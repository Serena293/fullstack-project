package com.capstone.plan_app.security;

import com.capstone.plan_app.user.AppUserDTO;
import com.capstone.plan_app.user.AppUserLoginDTO;
import com.capstone.plan_app.user.AppUsers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUserDTO appUserDTO) {
        logger.debug("Registrazione richiesta per username: {}", appUserDTO.getUsername());

        String token = authService.register(appUserDTO).getBody();
        logger.debug("Token generato per registrazione: {}", token);

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Token non generato"));
        }

        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AppUserLoginDTO appUserLoginDTO) {
        logger.debug("Login richiesto per username: {}", appUserLoginDTO.getUsername());

        String token = authService.login(appUserLoginDTO.getUsername(), appUserLoginDTO.getPassword()).getBody();
        logger.debug("Token generato dopo login: {}", token);

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Credenziali errate o token non generato"));
        }

        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.debug("Richiesta informazioni utente autenticato");

        if (authentication == null || !authentication.isAuthenticated()) {
            logger.warn("Utente non autenticato");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not authenticated"));
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            AppUsers currentUser = userDetails.getAppUser();
            logger.debug("Utente autenticato: {}", currentUser.getUsername());
            return ResponseEntity.ok(currentUser);
        } else {
            logger.warn("Principal non valido: {}", principal);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid authentication principal"));
        }
    }
}
