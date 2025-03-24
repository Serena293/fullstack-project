package com.capstone.plan_app.tasks;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {

    private Long taskId;
    private String title;
    private String description;

    @FutureOrPresent(message = "Due date must be in the future or present")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    @JsonProperty("isItPostIt")
    private boolean isItPostIt;

    // Add userId to link task to a user
    // private Long userId;

    public TaskDTO(Long taskId, @NotEmpty(message = "Task title cannot be empty") String title,
                   String description, @FutureOrPresent(message = "Due date must be in the future or present")
                   LocalDate dueDate, Boolean isItPostIt) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isItPostIt = isItPostIt != null ? isItPostIt : false;  // Handle null value for boolean
    }

    public TaskDTO(Long taskId, @NotEmpty(message = "Task title cannot be empty") String title,
                   String description, @FutureOrPresent(message = "Due date must be in the future or present") LocalDate dueDate,
                   Boolean isItPostIt, Long userId) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isItPostIt = isItPostIt != null ? isItPostIt : false;

    }

    public String getDueDateFormatted() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return dueDate != null ? dueDate.format(formatter) : null;
    }

    @JsonProperty("isItPostIt")
    public boolean getIsItPostIt() {
        return isItPostIt;
    }

    @JsonProperty("isItPostIt")
    public void setIsItPostIt(boolean isItPostIt) {
        this.isItPostIt = isItPostIt;
    }
}