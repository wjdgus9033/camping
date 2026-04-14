import "./Login.css";
import { useState } from "react";
import { loginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userid: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        userid: "",
        password: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const updatedForm = {
            ...form,
            [name]: value,
        };

        setForm(updatedForm);

        if (isSubmitted) {
            setErrors({
                userid: updatedForm.userid ? "" : "아이디는 필수입니다.",
                password: updatedForm.password ? "" : "비밀번호는 필수입니다.",
            });
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        const newErrors = {
            userid: form.userid ? "" : "아이디는 필수입니다.",
            password: form.password ? "" : "비밀번호는 필수입니다.",
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((v) => v !== "")) return;

        try {
            const res = await loginApi(form);

            login(res.data.token, {
                userid: res.data.userid,
                username: res.data.username,
            });

            alert("로그인 성공");
            navigate("/");
        } catch {
            alert("아이디 또는 비밀번호가 틀립니다.");
        }
    };

    return (
        <div className="login-root">
            <div className="login-container">
                <h2 className="login-title">아이디로 로그인 하기</h2>

                <form onSubmit={handleLogin}>
                    <div
                        className={`login-group-box ${errors.userid || errors.password ? "error" : ""
                            }`}
                    >
                        <div className="login-input-row">
                            <span className="login-input-icon">👤</span>
                            <input
                                type="text"
                                name="userid"
                                className="login-input"
                                placeholder="아이디"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="login-input-row">
                            <span className="login-input-icon">🔒</span>
                            <input
                                type="password"
                                name="password"
                                className="login-input"
                                placeholder="비밀번호"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        {errors.userid && <p className="error-msg">{errors.userid}</p>}
                        {errors.password && <p className="error-msg">{errors.password}</p>}
                    </div>

                    <button type="submit" className="login-btn">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;