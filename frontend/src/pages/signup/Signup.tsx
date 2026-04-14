import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { useState } from 'react';
import { Errors } from './Errors';
import type { FormType, ErrorsType } from './Errors';
import { signupApi, checkUseridApi } from '../../api/auth';


const Join = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormType>({
    useid: "",
    password: "",
    confirmPassword: "",
    username: "",
    birth: "",
    telecom: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<ErrorsType>({
    useid: "",
    password: "",
    confirmPassword: "",
    username: "",
    birth: "",
    telecom: "",
    phone: "",
    email: "",
  });
  const [isUseridChecked, setIsUseridChecked] = useState(false);
  const [useridCheckMsg, setUseridCheckMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as {
      name: keyof FormType;
      value: string;
    };

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
    if (name === "useid") {
      setIsUseridChecked(false);
      setUseridCheckMsg("");
    }

    if (isSubmitted) {
      const newErrors = Errors(updatedForm);
      setErrors(newErrors);
    }
  };
  const handleCheckUserid = async () => {
    if (!form.useid) {
      setUseridCheckMsg("아이디를 입력하세요");
      setIsUseridChecked(false);
      return;
    }

    try {
      const res = await checkUseridApi(form.useid);

      if (res.data) {
        setUseridCheckMsg("이미 사용중인 아이디입니다.");
        setIsUseridChecked(false);
      } else {
        setUseridCheckMsg("사용 가능한 아이디입니다.");
        setIsUseridChecked(true);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const errorsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors = Errors(form);
    setErrors(newErrors);

    if (Object.values(newErrors).some((v) => v !== "")) return;

    if (!isUseridChecked) {
      setUseridCheckMsg("아이디 중복확인을 해주세요.");
      return;
    }

    try {
      await signupApi(form);
      alert("회원가입 성공");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="join-root">
      <div className="join-container">
        <h2 className="join-title">회원가입</h2>

        <form className="join-form" onSubmit={errorsSubmit} noValidate>

          {/* 아이디 + 비밀번호 */}
          <div className={`join-group-box ${errors.useid || errors.password || errors.confirmPassword ? "error" : ""
            }`}>

            <div className="join-input-row">
              <span className="join-input-icon">👤</span>
              <input
                type="text"
                id="useid"
                name="useid"
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
              />
              <button type="button" onClick={handleCheckUserid}>중복확인</button>
            </div>
            <div className="error-wrap">
              {useridCheckMsg && (
                <p className={`error-msg ${isUseridChecked ? "blue" : "red"}`}>
                  {useridCheckMsg}
                </p>
              )}
            </div>

            <div className="join-input-row">
              <span className="join-input-icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="비밀번호 입력하세요"
              />
            </div>

            <div className="join-input-row">
              <span className="join-input-icon">🔒</span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="비밀번호 확인"
              />
            </div>
          </div>
          <div className="error-wrap">
            {isSubmitted && errors.useid && <p className="error-msg">{errors.useid}</p>}
            {isSubmitted && errors.password && <p className="error-msg">{errors.password}</p>}
            {isSubmitted && errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
          </div>


          {/* 이름 + 생년월일 + 통신사 */}
          <div className={`join-group-box ${errors.username || errors.birth || errors.phone ? "error" : ""
            }`}>

            <div className="join-input-row">
              <span className="join-input-icon">👤</span>
              <input type="text" name='username' placeholder="이름" onChange={handleChange} />
            </div>

            <div className="join-input-row">
              <span className="join-input-icon">📅</span>
              <input type="text" name='birth' placeholder="생년월일 8자리" onChange={handleChange} />
            </div>

            <div className="join-input-row">

              <span className="join-input-icon">📡</span>

              <select
                className="carrier"
                name="telecom"
                onChange={handleChange}
              >
                <option value="">통신사 선택</option>
                <option value="SKT">SKT</option>
                <option value="KT">KT</option>
                <option value="LG U+">LG U+</option>
              </select>

              <input
                type="text"
                className="phone"
                name="phone"
                onChange={handleChange}
                placeholder="휴대전화번호"
              />
            </div>
          </div>
          <div className="error-wrap">
            {isSubmitted && errors.username && <p className="error-msg">{errors.username}</p>}
            {isSubmitted && errors.birth && <p className="error-msg">{errors.birth}</p>}
            {isSubmitted && errors.telecom && <p className="error-msg">{errors.telecom}</p>}
            {isSubmitted && errors.phone && <p className="error-msg">{errors.phone}</p>}
          </div>

          {/* 이메일 */}
          <div className={`join-group-box ${errors.email ? "error" : ""}`}>

            <div className="join-input-row email-row">
              <span className="join-input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="이메일"
              />
              <select>
                <option>@naver.com</option>
                <option>@gmail.com</option>
              </select>
            </div>
          </div>
          <div className="error-wrap">
            {isSubmitted && errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          {/* 버튼 */}
          <button type="submit" className="join-btn">회원가입</button>
          <button type="button" className="backBt" onClick={() => navigate(-1)}>뒤로가기</button>

        </form>
      </div>
    </div>
  );
};

export default Join;