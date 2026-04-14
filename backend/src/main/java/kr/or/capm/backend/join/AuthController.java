package kr.or.capm.backend.join;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {

        authService.signup(request);

        return ResponseEntity.ok("회원가입 성공");
    }

    @GetMapping("/check-userid")
    public boolean checkUserid(@RequestParam String userid) {
        return authService.checkUserid(userid);
    }
}