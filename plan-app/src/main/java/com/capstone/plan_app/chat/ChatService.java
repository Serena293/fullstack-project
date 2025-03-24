package com.capstone.plan_app.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.plan_app.user.AppUsers;
import com.capstone.plan_app.user.AppUserRepository;
import com.capstone.plan_app.contacts.ContactRepository;

@Service
public class ChatService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private AppUserRepository userRepository; // Aggiunto per accedere agli utenti registrati

    public void startChat(AppUsers currentUser, String contactUsername) {
        // Recupera l'utente contatto tramite username
        AppUsers contactUser = userRepository.findByUsername(contactUsername)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        // Verifica che l'utente sia nei contatti
        boolean isContact = contactRepository.existsByAppUserAndContactUser(currentUser, contactUser);

        if (isContact) {
            // Se il contatto esiste, inizia la chat
            Chat chat = new Chat();
            chat.setUserOne(currentUser);
            chat.setUserTwo(contactUser);
            chatRepository.save(chat);
        } else {
            throw new RuntimeException("Non puoi chattare con un utente non nella tua rubrica");
        }
    }
}
