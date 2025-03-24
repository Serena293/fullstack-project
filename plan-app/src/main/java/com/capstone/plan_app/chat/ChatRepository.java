package com.capstone.plan_app.chat;

import com.capstone.plan_app.user.AppUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
 //   List<Chat> findByUserOneOrUserTwo(AppUsers userOne, AppUsers userTwo);

}
