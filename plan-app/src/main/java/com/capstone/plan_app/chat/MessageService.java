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

    public Message sendMessage(MessageRequest request) {
        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Il contenuto del messaggio non può essere vuoto");
        }

        AppUsers sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("Utente mittente non trovato con ID: " + request.getSenderId()));

        AppUsers receiver = userRepository.findByUsername(request.getReceiverUsername())
                .orElseThrow(() -> new IllegalArgumentException("Utente destinatario non trovato con username: " + request.getReceiverUsername()));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(request.getContent().trim());
        message.setTimestamp(LocalDateTime.now());
        message.setRead(false);

        return messageRepository.save(message);
    }

    public List<Message> getMessagesBetweenUserAndUsername(Long userId, String username) {
        if (userId == null || username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("ID utente e username non possono essere vuoti");
        }

        // Verifica che l'utente esista
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato con ID: " + userId));

        // Verifica che l'username esista
        userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato con username: " + username));

        return messageRepository.findMessagesBetweenUserAndUsername(userId, username);
    }

    @Transactional
    public void markAsRead(Long messageId) {
        if (messageId == null || messageId <= 0) {
            throw new IllegalArgumentException("ID messaggio non valido");
        }

        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("Messaggio non trovato con ID: " + messageId));

        if (!message.isRead()) {
            message.setRead(true);
            messageRepository.save(message);
        }
    }
}