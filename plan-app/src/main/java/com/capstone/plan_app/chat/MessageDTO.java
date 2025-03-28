package com.capstone.plan_app.chat;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Long id;
    private String content;
    private LocalDateTime timestamp;
    private boolean read;
    private Long senderId;
    private String senderUsername;  // Aggiunto
   // private Long receiverId;
    private String receiverUsername;  // Aggiunto

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.content = message.getContent();
        this.timestamp = message.getTimestamp();
        this.read = message.isRead();
        this.senderId = message.getSender() != null ? message.getSender().getUserId() : null;
        this.senderUsername = message.getSender() != null ? message.getSender().getUsername() : null;
      //this.receiverId = message.getReceiver() != null ? message.getReceiver().getUserId() : null;
        this.receiverUsername = message.getReceiver() != null ? message.getReceiver().getUsername() : null;
    }
}