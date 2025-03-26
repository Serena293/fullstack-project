package com.capstone.plan_app.profile;

import com.capstone.plan_app.user.AppUsers;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileUserRepository extends JpaRepository<ProfileUser, Long> {

    @EntityGraph(attributePaths = {"appUser"})
    Optional<ProfileUser> findByAppUser(AppUsers appUser);  // ✅ Ora restituisce Optional

    Optional<ProfileUser> findByAppUser_UserId(Long userId);  // ✅ Ora restituisce Optional

    boolean existsByAppUser_UserId(Long userId);  // ✅ Aggiunto per il metodo createEmptyProfile()
}
