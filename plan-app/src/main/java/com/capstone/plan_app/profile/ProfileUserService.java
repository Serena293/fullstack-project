package com.capstone.plan_app.profile;

import com.capstone.plan_app.exception.UserNotFoundException;
import com.capstone.plan_app.user.AppUserRepository;
import com.capstone.plan_app.user.AppUsers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileUserService {
    private final ProfileUserRepository profileUserRepo;
    private final AppUserRepository appUserRepo;

    @Transactional(readOnly = true)
    public ProfileUserDTO getCompleteProfile(Long userId) {
        AppUsers user = appUserRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        ProfileUser profile = profileUserRepo.findByAppUser_UserId(userId)
                .orElseGet(() -> {
                    ProfileUser newProfile = new ProfileUser();
                    newProfile.setAppUser(user);
                    return newProfile;
                });

        return new ProfileUserDTO(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                profile.getBio(),
                profile.getAvatarUrl()
        );
    }

    @Transactional
    public ProfileUserDTO updateCompleteProfile(Long userId, ProfileUserDTO updates) {
        // Aggiorna AppUsers (campi base)
        AppUsers user = appUserRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        if (updates.getFirstName() != null) user.setFirstName(updates.getFirstName());
        if (updates.getLastName() != null) user.setLastName(updates.getLastName());
        // Nota: L'email di solito richiede una verifica separata

        appUserRepo.save(user); // 🔹 Aggiunto per salvare le modifiche all'utente

        // Aggiorna ProfileUser (campi aggiuntivi)
        ProfileUser profile = profileUserRepo.findByAppUser_UserId(userId)
                .orElseGet(() -> {
                    ProfileUser newProfile = new ProfileUser();
                    newProfile.setAppUser(user);
                    return newProfile;
                });

        if (updates.getBio() != null) profile.setBio(updates.getBio());
        if (updates.getAvatarUrl() != null) profile.setAvatarUrl(updates.getAvatarUrl());

        profileUserRepo.save(profile);

        return getCompleteProfile(userId); // Restituisce lo stato aggiornato
    }
}
