package com.capstone.plan_app.contacts;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor  // Aggiunge il costruttore senza argomenti
@AllArgsConstructor // Aggiunge il costruttore con tutti i campi
public class AddContactRequest {

    @NotNull
    private String username;
}
