package com.capstone.plan_app.tasks;

import com.capstone.plan_app.security.CustomUserDetails;
import com.capstone.plan_app.user.AppUserRepository;
import com.capstone.plan_app.user.AppUsers;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);
    private final TaskService taskService;
    private final AppUserRepository appUsersRepository;

    public TaskController(TaskService taskService, AppUserRepository appUsersRepository) {
        this.taskService = taskService;
        this.appUsersRepository = appUsersRepository;
    }

    // Metodo per ottenere l'ID dell'utente autenticato con log aggiuntivi
    private Long getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("➡️ Authentication object: {}", authentication);

        if (authentication == null) {
            logger.error("❌ Errore: SecurityContext è NULL!");
            throw new RuntimeException("User not authenticated");
        }

        logger.info("🔍 Principal: {}", authentication.getPrincipal());
        logger.info("🔍 Authorities: {}", authentication.getAuthorities());
        logger.info("🔍 Authenticated: {}", authentication.isAuthenticated());

        if (authentication.getPrincipal() instanceof CustomUserDetails userDetails) {
            Long userId = userDetails.getAppUser().getUserId();
            logger.info("✅ Utente autenticato con ID: {}", userId);
            return userId;
        } else {
            logger.error("❌ Errore: Il principal non è un'istanza di CustomUserDetails! Principal ricevuto: {}", authentication.getPrincipal());
            throw new RuntimeException("User not authenticated");
        }
    }

    // Endpoint per ottenere tutte le task dell'utente autenticato
    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks(@RequestHeader("Authorization") String token) {
        logger.info("➡️ Richiesta GET /api/tasks ricevuta. Token: {}", token);
        try {
            Long userId = getAuthenticatedUserId();
            logger.info("🔍 Recupero task per userId: {}", userId);

            List<TaskDTO> tasks = taskService.getTasksByUserId(userId);
            logger.info("✅ Task recuperate con successo per userId: {}. Numero di task: {}", userId, tasks.size());

            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("❌ Errore nel recupero delle task: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint per ottenere le task di un utente specifico tramite ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskDTO>> getTasksByUserId(@PathVariable Long userId) {
        logger.info("➡️ Richiesta GET /api/tasks/user/{} ricevuta", userId);

        // 🔹 Debug aggiuntivo per vedere se il SecurityContext mantiene l'autenticazione
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("🔍 SecurityContextHolder Authentication: {}", authentication);

        try {
            List<TaskDTO> tasks = taskService.getTasksByUserId(userId);
            logger.info("✅ Task recuperate con successo per userId: {}. Numero di task: {}", userId, tasks.size());
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("❌ Errore nel recupero delle task per userId {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint per creare una nuova task per l'utente autenticato
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody Task task) {
        logger.info("➡️ Richiesta POST /api/tasks ricevuta. Task: {}", task);
        try {
            Long userId = getAuthenticatedUserId();
            logger.info("🔍 Creazione task per userId: {}", userId);

            AppUsers appUser = appUsersRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            task.setAppUser(appUser);
            TaskDTO createdTask = taskService.createTask(task);
            logger.info("✅ Task creata con successo: {}", createdTask);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (Exception e) {
            logger.error("❌ Errore nella creazione della task: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
