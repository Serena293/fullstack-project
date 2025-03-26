package com.capstone.plan_app.profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String bio;
    private String avatarUrl;
}
