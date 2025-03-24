package com.capstone.plan_app.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppUserLoginDTO {

    @NotEmpty(message = "Username is required")
    @NotNull
    private String username;

   @NotEmpty(message = "Password is required")
   @NotNull
    private String password;
}
