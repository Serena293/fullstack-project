package com.capstone.plan_app.security;

import com.capstone.plan_app.profile.ProfileUser;
import com.capstone.plan_app.user.AppUserDTO;
import com.capstone.plan_app.user.AppUserLoginDTO;
import com.capstone.plan_app.user.AppUsers;
import com.capstone.plan_app.user.AppUserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.capstone.plan_app.profile.ProfileUserRepository;

import java.util.Map;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AppUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService userDetailsService;
    private final ProfileUserRepository profileUserRepository;

    public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, AppUserRepository userRepo,
                       PasswordEncoder passwordEncoder, CustomUserDetailsService userDetailsService, ProfileUserRepository profileUserRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.profileUserRepository = profileUserRepository;
    }

    public ResponseEntity<?> register(@Valid AppUserDTO appUserDTO) {
        if (userRepo.existsByEmail(appUserDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email già esistente!");
        }
        if (userRepo.existsByUsername(appUserDTO.getUsername())) {
            return ResponseEntity.badRequest().body("Username già esistente!");
        }

        AppUsers user = new AppUsers();
        user.setFirstName(appUserDTO.getFirstName());
        user.setLastName(appUserDTO.getLastName());
        user.setUsername(appUserDTO.getUsername());
        user.setEmail(appUserDTO.getEmail());
        user.setPassword(passwordEncoder.encode(appUserDTO.getPassword()));
        AppUsers savedUser = userRepo.save(user);

        ProfileUser profile = new ProfileUser();
        profile.setAppUser(savedUser);
        profile.setBio(null);
        profile.setAvatarUrl(null);
        profileUserRepository.save(profile);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Registrazione completata con successo!",
                        "userId", savedUser.getUserId()
                )
        );
    }

    public ResponseEntity<String> login(@Valid AppUserLoginDTO appUserLoginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(appUserLoginDTO.getUsername(), appUserLoginDTO.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(appUserLoginDTO.getUsername());

        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;

        Long userId = customUserDetails.getAppUser().getUserId();

        String jwtToken = jwtUtil.generateToken(userDetails, userId);

        return ResponseEntity.ok("Bearer " + jwtToken);
    }

    public ResponseEntity<String> login(@NotEmpty(message = "Username obbligatorio") String username,
                                        @NotEmpty(message = "Password obbligatoria") String password) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;

        Long userId = customUserDetails.getAppUser().getUserId();

        String jwtToken = jwtUtil.generateToken(userDetails, userId);

        return ResponseEntity.ok(jwtToken);
    }

    public AppUsers findByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElse(null);
    }

    public AppUsers findById(Long id) {
        return userRepo.findById(id)
                .orElse(null);
    }

    public void saveUser(AppUsers user) {
        userRepo.save(user);
    }
}
