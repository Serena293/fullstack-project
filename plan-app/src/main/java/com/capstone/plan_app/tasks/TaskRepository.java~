package com.capstone.plan_app.tasks;

import com.capstone.plan_app.user.AppUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

  List<Task> findByAppUser_UserId(Long userId);

 // void deleteById(Long taskId);

  @Modifying
  @Query("DELETE FROM Task t WHERE t.taskId = :taskId AND t.appUser.userId = :userId")
  void deleteTaskById(@Param("taskId") Long taskId, @Param("userId") Long userId);


}
