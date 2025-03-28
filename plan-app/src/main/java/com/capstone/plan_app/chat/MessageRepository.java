package com.capstone.plan_app.chat;

import com.capstone.plan_app.user.AppUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

//    List<Message> findByReceiverAndReadFalse(AppUsers receiver);
//
//    @Query("SELECT m FROM Message m WHERE " +
//            "(m.sender = :user1 AND m.receiver = :user2) OR " +
//            "(m.sender = :user2 AND m.receiver = :user1) " +
//            "ORDER BY m.timestamp")
//    List<Message> findConversationBetweenUsers(@Param("user1") AppUsers user1, @Param("user2") AppUsers user2);



    @Query("SELECT m FROM Message m WHERE " +
            "(m.sender.userId = :userId AND m.receiver.username = :username) OR " +
            "(m.sender.username = :username AND m.receiver.userId = :userId) " +
            "ORDER BY m.timestamp ASC")
    List<Message> findMessagesBetweenUserAndUsername(@Param("userId") Long userId,
                                                     @Param("username") String username);

}