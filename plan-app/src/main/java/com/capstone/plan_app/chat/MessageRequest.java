package com.capstone.plan_app.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {
    @NotNull
    private Long senderId;

    @NotBlank
    private String receiverUsername;

    @NotBlank
    private String content;
}