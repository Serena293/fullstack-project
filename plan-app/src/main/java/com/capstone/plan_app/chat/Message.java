package com.capstone.plan_app.chat;

import com.capstone.plan_app.user.AppUsers;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    private AppUsers sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    private AppUsers receiver;

    @Column(nullable = false)
    private String content;

    private LocalDateTime timestamp = LocalDateTime.now();

    private boolean read = false;



}

