/*

package com.capstone.plan_app;

import com.capstone.plan_app.tasks.Task;
import com.capstone.plan_app.tasks.TaskDTO;
import com.capstone.plan_app.tasks.TaskRepository;
import com.capstone.plan_app.tasks.TaskService;
import com.capstone.plan_app.user.AppUserRepository;
import com.capstone.plan_app.user.AppUsers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {

    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private AppUserRepository appUserRepository;

    @Mock
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        taskService = new TaskService(taskRepository, appUserRepository);
        SecurityContextHolder.getContext().setAuthentication(authentication);  // Set up authentication context for the tests
    }

    @Test
    void testGetUserTasks() {
        // Mock authenticated user
        AppUsers authenticatedUser = new AppUsers();
        authenticatedUser.setUserId(1L);
        when(authentication.getName()).thenReturn("testuser");
        when(appUserRepository.findByUsername("testuser")).thenReturn(Optional.of(authenticatedUser));

        // Mock task repository
        Task task = new Task("Test Task", "Test Description", "2025-03-22", false);
        task.setAppUser(authenticatedUser);
        when(taskRepository.findByAppUser_UserId(1L)).thenReturn(Arrays.asList(task));

        // Call the method
        var tasks = taskService.getUserTasks();

        // Assertions
        assertNotNull(tasks);
        assertEquals(1, tasks.size());
        assertEquals("Test Task", tasks.get(0).getTitle());
        assertEquals("Test Description", tasks.get(0).getDescription());
    }

    @Test
    void testCreateTask() {
        // Mock authenticated user
        AppUsers authenticatedUser = new AppUsers();
        authenticatedUser.setUserId(1L);
        when(authentication.getName()).thenReturn("testuser");
        when(appUserRepository.findByUsername("testuser")).thenReturn(Optional.of(authenticatedUser));

        // Create a task
        Task task = new Task("New Task", "New Task Description", "2025-03-23", true);
        task.setAppUser(authenticatedUser);

        // Mock the repository save method
        Task savedTask = new Task("New Task", "New Task Description", "2025-03-23", true);
        savedTask.setTaskId(1L);
        when(taskRepository.save(task)).thenReturn(savedTask);

        // Call the method
        TaskDTO createdTask = taskService.createTask(task);

        // Assertions
        assertNotNull(createdTask);
        assertEquals("New Task", createdTask.getTitle());
        assertEquals("New Task Description", createdTask.getDescription());
        assertTrue(createdTask.getIsItPostIt());
    }

    @Test
    void testGetTasksByUserId() {
        // Mock task repository and user
        Long userId = 1L;
        Task task = new Task("Task 1", "Description 1", "2025-03-22", false);
        task.setAppUser(new AppUsers());  // Mock user
        task.getAppUser().setUserId(userId);
        when(taskRepository.findByAppUser_UserId(userId)).thenReturn(Arrays.asList(task));

        // Call the method
        var tasks = taskService.getTasksByUserId(userId);

        // Assertions
        assertNotNull(tasks);
        assertEquals(1, tasks.size());
        assertEquals("Task 1", tasks.get(0).getTitle());
        assertEquals("Description 1", tasks.get(0).getDescription());
    }

    @Test
    void testGetAuthenticatedUser() {
        // Mock authentication
        AppUsers authenticatedUser = new AppUsers();
        authenticatedUser.setUserId(1L);
        when(authentication.getName()).thenReturn("testuser");
        when(appUserRepository.findByUsername("testuser")).thenReturn(Optional.of(authenticatedUser));

        // Call the method to get the authenticated user
        AppUsers user = taskService.getAuthenticatedUser();

        // Assertions
        assertNotNull(user);
        assertEquals(1L, user.getUserId());
    }
}

*/