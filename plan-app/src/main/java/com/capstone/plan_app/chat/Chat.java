package com.capstone.plan_app.chat;

import jakarta.persistence.*;
import com.capstone.plan_app.user.AppUsers;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @ManyToOne
    @JoinColumn(name = "user_one_id", nullable = false)
    private AppUsers userOne;  // Il primo utente della chat

    @ManyToOne
    @JoinColumn(name = "user_two_id", nullable = false)
    private AppUsers userTwo;  // Il secondo utente della chat


}
