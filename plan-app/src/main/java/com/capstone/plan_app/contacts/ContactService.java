package com.capstone.plan_app.contacts;

import com.capstone.plan_app.user.AppUserRepository;
import com.capstone.plan_app.user.AppUsers;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContactService {
    private final AppUserRepository appUserRepository;

    public ContactService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }
    @Transactional
    public void addContactByUsername(Long userId, String contactUsername) {
        AppUsers user = appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));

        AppUsers contact = appUserRepository.findByUsername(contactUsername)
                .orElseThrow(() -> new IllegalArgumentException("Contatto non trovato"));

        // Controllo ottimizzato se il contatto esiste già
        boolean contactExists = user.getContacts().stream()
                .anyMatch(c -> c.getUserId().equals(contact.getUserId()));

        if (contactExists) {
            return; // Esce silenziosamente se il contatto esiste già
        }

        user.getContacts().add(contact);
    }

    @Transactional(readOnly = true)
    public List<AppUsers> getContacts(Long userId) {
        return appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"))
                .getContacts();
    }

    @Transactional
    public void removeContactByUsername(Long userId, String contactUsername) {
        AppUsers user = appUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));

        AppUsers contact = appUserRepository.findByUsername(contactUsername)
                .orElseThrow(() -> new IllegalArgumentException("Contatto non trovato"));

        if (!user.getContacts().remove(contact)) {
            throw new IllegalArgumentException("Contatto non presente nella lista");
        }
    }
}