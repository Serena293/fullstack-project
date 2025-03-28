//package com.capstone.plan_app.contacts;
//
//import com.capstone.plan_app.user.AppUsers;
//import jakarta.validation.Valid;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.http.ResponseEntity;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/users/{userId}/contacts")
//public class ContactController {
//
//    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
//    private final ContactService contactService;
//
//    @Autowired
//    public ContactController(ContactService contactService) {
//        this.contactService = contactService;
//    }
//    @PostMapping
//    public ResponseEntity<String> addContact(
//            @PathVariable Long userId,
//            @Valid @RequestBody AddContactRequest request) {
//
//        contactService.addContactByUsername(userId, request.getUsername());
//        return ResponseEntity.ok("Operazione completata");
//    }
//
//    @GetMapping
//    public ResponseEntity<?> getContacts(@PathVariable Long userId) {
//        logger.info("Richiesta contatti per userId: {}", userId);
//
//        try {
//            List<AppUsers> contacts = contactService.getContacts(userId);
//            logger.info("Trovati {} contatti", contacts.size());
//            return ResponseEntity.ok(contacts);
//
//        } catch (Exception e) {
//            logger.error("Errore recupero contatti: ", e);
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    @DeleteMapping("/{username}")
//    @Transactional
//    public ResponseEntity<String> removeContact(
//            @PathVariable Long userId,
//            @PathVariable String username) {
//
//        logger.info("Richiesta rimozione contatto - UserID: {} | Username: {}", userId, username);
//
//        try {
//            contactService.removeContactByUsername(userId, username);
//            logger.info("Contatto rimosso con successo");
//            return ResponseEntity.ok("Contatto rimosso con successo");
//
//        } catch (Exception e) {
//            logger.error("Errore rimozione contatto: ", e);
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//}


package com.capstone.plan_app.contacts;

import com.capstone.plan_app.user.AppUsers;
import com.capstone.plan_app.user.AppUserDTO;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/{userId}/contacts")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    private final ContactService contactService;

    // Injection tramite costruttore (meglio di @Autowired su campo)
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<String> addContact(
            @PathVariable Long userId,
            @Valid @RequestBody AddContactRequest request) {

        try {
            logger.info("Aggiunta contatto - UserID: {} | Username: {}", userId, request.getUsername());
            contactService.addContactByUsername(userId, request.getUsername());
            return ResponseEntity.ok("Contatto aggiunto con successo");
        } catch (Exception e) {
            logger.error("Errore aggiunta contatto", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getContacts(@PathVariable Long userId) {
        logger.info("Richiesta contatti per userId: {}", userId);

        try {
            List<AppUsers> contacts = contactService.getContacts(userId);

            // Converti List<AppUsers> in List<AppUserDTO>
            List<AppUserDTO> contactDTOs = contacts.stream()
                    .map(this::convertToAppUserDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(contactDTOs);
        } catch (Exception e) {
            logger.error("Errore recupero contatti", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{username}")
    @Transactional
    public ResponseEntity<String> removeContact(
            @PathVariable Long userId,
            @PathVariable String username) {

        logger.info("Rimozione contatto - UserID: {} | Username: {}", userId, username);

        try {
            contactService.removeContactByUsername(userId, username);
            return ResponseEntity.ok("Contatto rimosso con successo");
        } catch (Exception e) {
            logger.error("Errore rimozione contatto", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Metodo per convertire AppUsers in AppUserDTO
    private AppUserDTO convertToAppUserDTO(AppUsers user) {
        AppUserDTO dto = new AppUserDTO();
       // dto.setUserId(user.getUserId());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        // Aggiungi altri campi se necessario
        return dto;
    }
}