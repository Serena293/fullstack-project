package com.capstone.plan_app.profile;

import com.capstone.plan_app.user.AppUsers;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUsers appUser;

    @Column(length = 500)
    private String bio;

    @Column (nullable = true)
    private String avatarUrl;
}
