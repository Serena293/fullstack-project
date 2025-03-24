package com.capstone.plan_app.tasks;

import com.capstone.plan_app.user.AppUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

  List<Task> findByAppUser_UserId(Long userId);

}
