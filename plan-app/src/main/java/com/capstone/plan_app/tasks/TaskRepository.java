package com.capstone.plan_app.tasks;

import com.capstone.plan_app.user.AppUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

  List<Task> findByAppUser_UserId(Long userId);

 // void deleteById(Long taskId);

  @Modifying
  @Query("DELETE FROM Task t WHERE t.taskId = :taskId AND t.appUser.userId = :userId")
  void deleteTaskById(@Param("taskId") Long taskId, @Param("userId") Long userId);

  @Query("SELECT t FROM Task t WHERE t.taskId = :taskId AND t.appUser.userId = :userId")
  Optional<Task> findByTaskIdAndUserId(@Param("taskId") Long taskId, @Param("userId") Long userId);

  @Modifying
  @Query("UPDATE Task t SET t.completed = :completed WHERE t.taskId = :taskId AND t.appUser.userId = :userId")
  int updateCompletedStatus(@Param("taskId") Long taskId,
                            @Param("userId") Long userId,
                            @Param("completed") boolean completed);

}
