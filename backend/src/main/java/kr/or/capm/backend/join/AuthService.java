package kr.or.capm.backend.join;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(SignupRequest request) {

        User user = User.builder()
                .userid(request.getUserid())
                .password(passwordEncoder.encode(request.getPassword()))
                .username(request.getUsername())
                .birth(request.getBirth())
                .telecom(request.getTelecom())
                .phone(request.getPhone())
                .email(request.getEmail())
                .build();

        userRepository.save(user);
    }
    public boolean checkUserid(String userid) {
        return userRepository.existsByUserid(userid);
    }
}