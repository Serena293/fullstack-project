package com.capstone.plan_app.profile;

import com.capstone.plan_app.security.AuthService;
import com.capstone.plan_app.security.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileUserController {

    private final ProfileUserService profileUserService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<ProfileUserDTO> getCompleteProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        Long userId = userDetails.getAppUser().getUserId();
        ProfileUserDTO profile = profileUserService.getCompleteProfile(userId);
        return ResponseEntity.ok(profile);
    }


    @PatchMapping
    public ResponseEntity<ProfileUserDTO> updateProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid ProfileUserDTO updates
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        Long userId = userDetails.getAppUser().getUserId();
        ProfileUserDTO updatedProfile = profileUserService.updateCompleteProfile(userId, updates);
        return ResponseEntity.ok(updatedProfile);
    }
}
