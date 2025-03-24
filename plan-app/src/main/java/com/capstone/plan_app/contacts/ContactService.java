package com.capstone.plan_app.contacts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.plan_app.user.AppUsers;
import com.capstone.plan_app.user.AppUserRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private AppUserRepository userRepository;  // Qui usiamo il tuo AppUserRepository

    // Aggiungi un contatto
    public void addContact(AppUsers currentUser, String username) {
        Optional<AppUsers> optionalContactUser = userRepository.findByUsername(username);
        if (optionalContactUser.isPresent()) {
            AppUsers contactUser = optionalContactUser.get();
            if (!contactUser.equals(currentUser)) {
                Contact contact = new Contact();
                contact.setAppUser(currentUser);
                contact.setContactUser(contactUser);
                contactRepository.save(contact);
            } else {
                throw new RuntimeException("Non puoi aggiungere te stesso come contatto");
            }
        } else {
            throw new RuntimeException("Utente non trovato");
        }
    }

    // Recupera tutti i contatti di un utente
    public List<AppUsers> getContacts(AppUsers currentUser) {
        List<Contact> contacts = contactRepository.findByAppUser(currentUser);
        return contacts.stream()
                .map(Contact::getContactUser)
                .toList();
    }
}
