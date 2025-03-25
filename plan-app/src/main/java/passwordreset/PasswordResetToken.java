package passwordreset;

import com.capstone.plan_app.user.AppUsers;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;
    private LocalDateTime expiryDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUsers appUsers;

    public boolean isExpired() {
        return expiryDate.isBefore(LocalDateTime.now());
    }
}
