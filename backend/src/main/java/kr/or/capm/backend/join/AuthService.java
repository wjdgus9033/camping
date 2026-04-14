package kr.or.capm.backend.join;

import kr.or.capm.backend.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signup(SignupRequest request) {

        if (request.getPassword().length() < 8 || request.getPassword().length() > 20) {
            throw new IllegalArgumentException("비밀번호는 8자 이상 20자 이하로 입력해주세요.");
        }

        User user = User.builder()
                .userid(request.getUserid())
                .password(passwordEncoder.encode(request.getPassword()))
                .username(request.getUsername())
                .birth(request.getBirth())
                .telecom(request.getTelecom())
                .phone(request.getPhone())
                .email(request.getEmail())
                .role("USER")
                .build();

        userRepository.save(user);
    }
    public boolean checkUserid(String userid) {
        return userRepository.existsByUserid(userid);
    }

    public Map<String, Object> login(LoginRequest request) {

        User user = userRepository.findByUserid(request.getUserid())
                .orElseThrow(() -> new RuntimeException("없는 아이디 입니다."));

        // 비밀번호 비교
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }

        // JWT 생성
        return Map.of(
                "token", jwtUtil.createToken(user.getUserid()),
                "userid", user.getUserid(),
                "username", user.getUsername(),
                "phone", user.getPhone(),
                "role", user.getRole()
        );
    }

    public ResponseEntity<?> getMyInfo(String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String userid = jwtUtil.getUserid(token);

        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        return ResponseEntity.ok(Map.of(
                "userid", user.getUserid(),
                "username", user.getUsername(),
                "phone", user.getPhone(),
                "email", user.getEmail()
        ));
    }
}