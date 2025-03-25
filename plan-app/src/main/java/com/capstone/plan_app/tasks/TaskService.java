package com.capstone.plan_app.tasks;

import com.capstone.plan_app.user.AppUsers;
import com.capstone.plan_app.user.AppUserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    private final AppUserRepository appUserRepository;

    public TaskService(TaskRepository taskRepository, AppUserRepository appUserRepository) {
        this.taskRepository = taskRepository;
        this.appUserRepository = appUserRepository;
    }

    // Metodo per ottenere tutte le task dell'utente autenticato
    public List<TaskDTO> getUserTasks() {
        AppUsers user = getAuthenticatedUser();
        List<Task> tasks = taskRepository.findByAppUser_UserId(user.getUserId());
        System.out.println("authenticated user:" + user);
        return tasks.stream()
                .map(task -> new TaskDTO(
                        task.getTaskId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getDueDate(),
                        task.getIsItPostIt(),
                        task.getAppUser().getUserId() // Passa l'ID dell'utente al TaskDTO
                ))
                .collect(Collectors.toList());
    }

    // Metodo per creare una nuova task per l'utente autenticato
    @Transactional
    public TaskDTO createTask(Task task) {
        AppUsers user = getAuthenticatedUser();
        task.setAppUser(user); // Imposta l'utente autenticato nella task

        // Salva la task e restituisci il TaskDTO con l'ID dell'utente
        Task savedTask = taskRepository.save(task);
        return new TaskDTO(
                savedTask.getTaskId(),
                savedTask.getTitle(),
                savedTask.getDescription(),
                savedTask.getDueDate(),
                savedTask.getIsItPostIt(),
                savedTask.getAppUser().getUserId() // Passa l'ID dell'utente al TaskDTO
        );
    }

    // Metodo per ottenere l'utente autenticato
    private AppUsers getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("User is not authenticated");
        }
        return appUserRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    @Transactional
    public boolean deleteTask(Long taskId) {
        AppUsers user = getAuthenticatedUser();
        taskRepository.deleteTaskById(taskId, user.getUserId());
        return true;
    }

    // Metodo per ottenere le task di un utente specifico tramite ID
    public List<TaskDTO> getTasksByUserId(Long userId) {
        List<Task> tasks = taskRepository.findByAppUser_UserId(userId);
        return tasks.stream()
                .map(task -> new TaskDTO(
                        task.getTaskId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getDueDate(),
                        task.getIsItPostIt(),
                        task.getAppUser().getUserId() // Passa l'ID dell'utente al TaskDTO
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public TaskDTO editTask(Long taskId, Task updatedTask) {
        AppUsers user = getAuthenticatedUser();

        Task task = taskRepository.findByTaskIdAndUserId(taskId, user.getUserId())
                .orElseThrow(() -> new RuntimeException("Task non trovata o non autorizzata"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setIsItPostIt(updatedTask.isItPostIt());

        // 4. Salvare la task aggiornata nel database
        Task savedTask = taskRepository.save(task);

        // 5. Restituire la task aggiornata come TaskDTO
        return new TaskDTO(
                savedTask.getTaskId(),
                savedTask.getTitle(),
                savedTask.getDescription(),
                savedTask.getDueDate(),
                savedTask.getIsItPostIt(),
                savedTask.getAppUser().getUserId()
        );
    }



}