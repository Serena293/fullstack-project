package com.capstone.plan_app.contacts;

import com.capstone.plan_app.user.AppUserRepository;
import com.capstone.plan_app.user.AppUsers;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ContactService {
    private final AppUserRepository appUserRepository;

    public ContactService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public void addContactByUsername(Long userId, String contactUsername) throws Exception {
        AppUsers user = appUserRepository.findById(userId)
                .orElseThrow(() -> new Exception("Utente non trovato"));

        AppUsers contact = appUserRepository.findByUsername(contactUsername)
                .orElseThrow(() -> new Exception("Utente con username '" + contactUsername + "' non trovato"));

        if (user.getUserId().equals(contact.getUserId())) {
            throw new Exception("Non puoi aggiungere te stesso come contatto");
        }

        if (user.getContacts().stream()
                .anyMatch(c -> c.getUserId().equals(contact.getUserId()))) {
            throw new Exception("Questo utente è già nella tua lista contatti");
        }

        user.getContacts().add(contact);
        appUserRepository.save(user);
    }

    public List<AppUsers> getContacts(Long userId) throws Exception {
        AppUsers user = appUserRepository.findById(userId)
                .orElseThrow(() -> new Exception("Utente non trovato"));
        return user.getContacts();
    }

    public void removeContactByUsername(Long userId, String contactUsername) throws Exception {
        AppUsers user = appUserRepository.findById(userId)
                .orElseThrow(() -> new Exception("Utente non trovato"));

        AppUsers contact = appUserRepository.findByUsername(contactUsername)
                .orElseThrow(() -> new Exception("Contatto non trovato"));

        if (!user.getContacts().removeIf(c -> c.getUserId().equals(contact.getUserId()))) {
            throw new Exception("Contatto non presente nella lista");
        }

        appUserRepository.save(user);
    }
}