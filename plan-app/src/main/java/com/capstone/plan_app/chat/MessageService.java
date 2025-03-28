package com.capstone.plan_app.chat;

import com.capstone.plan_app.user.AppUsers;
import com.capstone.plan_app.user.AppUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class MessageService {

    private final MessageRepository messageRepository;
    private final AppUserRepository userRepository;

    public MessageService(MessageRepository messageRepository,
                          AppUserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    // Method to send a message
    public Message sendMessage(MessageRequest request) {
        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Message content cannot be empty");
        }

        AppUsers sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found with ID: " + request.getSenderId()));

        AppUsers receiver = userRepository.findByUsername(request.getReceiverUsername())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found with username: " + request.getReceiverUsername()));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(request.getContent().trim());
        message.setTimestamp(LocalDateTime.now());
        message.setRead(false);

        return messageRepository.save(message);
    }

    // Method to retrieve messages between the authenticated user and a specific user (by username)
    public List<Message> getMessagesBetweenUserAndUsername(Long userId, String username) {
        if (userId == null || username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID and username cannot be empty");
        }

        // Check if the user exists
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Check if the username exists
        userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        return messageRepository.findMessagesBetweenUserAndUsername(userId, username);
    }

    // Method to mark a message as read
    @Transactional
    public void markAsRead(Long messageId) {
        if (messageId == null || messageId <= 0) {
            throw new IllegalArgumentException("Invalid message ID");
        }

        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("Message not found with ID: " + messageId));

        if (!message.isRead()) {
            message.setRead(true);
            messageRepository.save(message);
        }
    }
}
