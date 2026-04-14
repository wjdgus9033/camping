package kr.or.capm.backend.join;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String userid;
    private String password;
    private String username;
    private String birth;
    private String telecom;
    private String phone;
    private String email;
}
