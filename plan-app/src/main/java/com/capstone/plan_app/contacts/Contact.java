package com.capstone.plan_app.contacts;

import com.capstone.plan_app.user.AppUsers;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contactId;

    @ManyToOne
    @JoinColumn(name = "contact_user_id", nullable = false)
    private AppUsers contactUser; //contatti aggiunti

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUsers appUser; //USER registrato che può aggiungere altri contatti
}
