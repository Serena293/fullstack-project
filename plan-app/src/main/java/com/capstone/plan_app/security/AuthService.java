package com.capstone.plan_app.security;

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

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AppUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService userDetailsService;

    // Constructor to inject dependencies
    public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, AppUserRepository userRepo,
                       PasswordEncoder passwordEncoder, CustomUserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
    }

    // 🔹 Register a new user using AppUserDTO
    public ResponseEntity<String> register(@Valid AppUserDTO appUserDTO) {
        // Convert AppUserDTO to AppUsers entity
        AppUsers user = new AppUsers();
        user.setFirstName(appUserDTO.getFirstName());
        user.setLastName(appUserDTO.getLastName());
        user.setUsername(appUserDTO.getUsername());
        user.setEmail(appUserDTO.getEmail());
        user.setPassword(passwordEncoder.encode(appUserDTO.getPassword())); // Encode the password

        // Save user in the repository
        userRepo.save(user);

        // Return success message
        return ResponseEntity.ok("User registered successfully!");
    }

    // 🔹 Authenticate user and return JWT token (with userId)
    public ResponseEntity<String> login(@Valid AppUserLoginDTO appUserLoginDTO) {
        // Authenticate the user with the provided username and password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(appUserLoginDTO.getUsername(), appUserLoginDTO.getPassword())
        );

        // Load user details and generate JWT token if authentication is successful
        UserDetails userDetails = userDetailsService.loadUserByUsername(appUserLoginDTO.getUsername());

        // Cast to CustomUserDetails to access the AppUsers entity
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;

        // Extract userId from the customUserDetails
        Long userId = customUserDetails.getAppUser().getUserId();  // Access the AppUsers object and get userId

        // Generate the token using the userId
        String jwtToken = jwtUtil.generateToken(userDetails, userId);

        // Return JWT token with "Bearer" prefix
        return ResponseEntity.ok("Bearer " + jwtToken);
    }

    // 🔹 Alternative login method returning token as a String (with userId)
    public ResponseEntity<String> login(@NotEmpty(message = "Username is required") String username,
                                        @NotEmpty(message = "Password is required") String password) {

        // Authenticate the user with the provided username and password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        // Load user details and generate JWT token if authentication is successful
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // Cast to CustomUserDetails to access the AppUsers entity
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;

        // Extract userId from the customUserDetails
        Long userId = customUserDetails.getAppUser().getUserId();  // Access the AppUsers object and get userId

        // Generate the token using the userId
        String jwtToken = jwtUtil.generateToken(userDetails,userId);


        // Return JWT token as a String
        //return ResponseEntity.ok("Bearer " + jwtToken);
        return ResponseEntity.ok(jwtToken);
    }


    // 🔹 Trova un utente per email
    public AppUsers findByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElse(null); // Oppure puoi lanciare un'eccezione
    }

    // 🔹 Trova un utente per ID
    public AppUsers findById(Long id) {
        return userRepo.findById(id)
                .orElse(null);
    }

    // 🔹 Salva l'utente (dopo reset password)
    public void saveUser(AppUsers user) {
        userRepo.save(user);
    }

}
