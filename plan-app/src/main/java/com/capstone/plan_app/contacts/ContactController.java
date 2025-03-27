package com.capstone.plan_app.contacts;

import com.capstone.plan_app.user.AppUsers;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/users/{userId}/contacts")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // Aggiungi un contatto tramite username
    @PostMapping
    public ResponseEntity<String> addContact(
            @PathVariable Long userId,
            @Valid @RequestBody AddContactRequest request) {
        try {
            contactService.addContactByUsername(userId, request.getUsername());
            return ResponseEntity.ok("Contatto aggiunto con successo");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Ottieni tutti i contatti di un utente
    @GetMapping
    public ResponseEntity<?> getContacts(@PathVariable Long userId) {
        try {
            List<AppUsers> contacts = contactService.getContacts(userId);
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Rimuovi un contatto tramite username
    @DeleteMapping("/{username}")
    public ResponseEntity<String> removeContact(
            @PathVariable Long userId,
            @PathVariable String username) {
        try {
            contactService.removeContactByUsername(userId, username);
            return ResponseEntity.ok("Contatto rimosso con successo");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
