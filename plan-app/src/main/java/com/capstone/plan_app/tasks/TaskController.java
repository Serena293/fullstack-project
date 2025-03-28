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
import java.util.Map;

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

    // Method to get the authenticated user's ID with additional logging
    private Long getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logger.info("➡️ Authentication object: {}", authentication);

        if (authentication == null) {
            logger.error("❌ Error: SecurityContext is NULL!");
            throw new RuntimeException("User not authenticated");
        }

        logger.info("🔍 Principal: {}", authentication.getPrincipal());
        logger.info("🔍 Authorities: {}", authentication.getAuthorities());
        logger.info("🔍 Authenticated: {}", authentication.isAuthenticated());

        if (authentication.getPrincipal() instanceof CustomUserDetails userDetails) {
            Long userId = userDetails.getAppUser().getUserId();
            logger.info("✅ Authenticated user with ID: {}", userId);
            return userId;
        } else {
            logger.error("❌ Error: Principal is not an instance of CustomUserDetails! Principal received: {}", authentication.getPrincipal());
            throw new RuntimeException("User not authenticated");
        }
    }

    // Endpoint to delete a task by its ID
    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        logger.info("➡️ DELETE request /api/tasks/{} received", taskId);
        try {
            Long userId = getAuthenticatedUserId();
            logger.info("🔍 Deleting task {} for userId: {}", taskId, userId);

            boolean deleted = taskService.deleteTask(taskId);
            if (deleted) {
                logger.info("✅ Task {} successfully deleted", taskId);
                return ResponseEntity.ok().build();
            } else {
                logger.warn("⚠️ Task {} not found or not authorized for userId: {}", taskId, userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found or not authorized");
            }
        } catch (Exception e) {
            logger.error("❌ Error deleting task {}: {}", taskId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting task");
        }
    }

    // Endpoint to get all tasks for the authenticated user
    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks(@RequestHeader("Authorization") String token) {
        logger.info("➡️ GET request /api/tasks received. Token: {}", token);
        try {
            Long userId = getAuthenticatedUserId();
            logger.info("🔍 Retrieving tasks for userId: {}", userId);

            List<TaskDTO> tasks = taskService.getTasksByUserId(userId);
            logger.info("✅ Tasks successfully retrieved for userId: {}. Number of tasks: {}", userId, tasks.size());

            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("❌ Error retrieving tasks: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint to get tasks for a specific user by their ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskDTO>> getTasksByUserId(@PathVariable Long userId) {
        logger.info("➡️ GET request /api/tasks/user/{} received", userId);

        try {
            List<TaskDTO> tasks = taskService.getTasksByUserId(userId);
            logger.info("✅ Tasks successfully retrieved for userId: {}. Number of tasks: {}", userId, tasks.size());
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("❌ Error retrieving tasks for userId {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint to create a new task for the authenticated user
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody Task task) {
        logger.info("➡️ POST request /api/tasks received. Task: {}", task);
        try {
            Long userId = getAuthenticatedUserId();
            logger.info("🔍 Creating task for userId: {}", userId);

            AppUsers appUser = appUsersRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            task.setAppUser(appUser);
            TaskDTO createdTask = taskService.createTask(task);
            logger.info("✅ Task successfully created: {}", createdTask);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (Exception e) {
            logger.error("❌ Error creating task: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint to update the completion status of a task
    @PatchMapping("/{taskId}/completion")
    public ResponseEntity<TaskDTO> updateTaskCompletion(
            @PathVariable Long taskId,
            @RequestBody Map<String, Boolean> requestBody) {  // Accepts the completion value from the body
        boolean completed = requestBody.getOrDefault("completed", false);

        try {
            TaskDTO updatedTask = taskService.updateTaskCompletion(taskId, completed);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            logger.error("Error updating task completion status: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Endpoint to edit a task
    @PutMapping("/{taskId}")
    public ResponseEntity<?> editTask(@PathVariable Long taskId, @Valid @RequestBody Task updatedTask) {
        logger.info("➡️ PUT request /api/tasks/{} received. Updated task: {}", taskId, updatedTask);

        try {
            Long userId = getAuthenticatedUserId();
            logger.info("🔍 Modifying task {} for userId: {}", taskId, userId);

            TaskDTO editedTask = taskService.editTask(taskId, updatedTask);
            logger.info("✅ Task {} successfully modified for userId: {}", taskId, userId);

            return ResponseEntity.ok(editedTask);
        } catch (RuntimeException e) {
            logger.warn("⚠️ Error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            logger.error("❌ Error modifying task {}: {}", taskId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error modifying task");
        }
    }

}
