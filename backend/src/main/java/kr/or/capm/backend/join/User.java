package kr.or.capm.backend.join;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String userid;

    private String password;
    private String username;
    private String birth;
    private String telecom;
    private String phone;
    private String email;

    @Column(nullable = false)
    private String role;
}
