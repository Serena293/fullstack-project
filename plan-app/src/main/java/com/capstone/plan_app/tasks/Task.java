package com.capstone.plan_app.tasks;

import com.capstone.plan_app.user.AppUsers;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long taskId;

    @NotEmpty(message = "Task title cannot be empty")
    @Column(nullable = false)
    private String title;

    private String description;

    @FutureOrPresent(message = "Due date must be in the future or present")

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    private Boolean isItPostIt;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    @ToString.Exclude
    private AppUsers appUser;


    public Task(String title, String description, LocalDate dueDate, boolean isItPostIt) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate  ;
        this.isItPostIt = isItPostIt;
    }

    public boolean getIsItPostIt() {
        return isItPostIt;
    }


    public Boolean isItPostIt() {
        return  isItPostIt;
    }
}
