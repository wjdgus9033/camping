package kr.or.capm.backend.join;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String userid;
    private String password;
}
