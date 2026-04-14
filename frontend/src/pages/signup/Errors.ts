export type FormType = {
  useid: string;
  password: string;
  confirmPassword: string;
  username: string;
  birth: string;
  telecom:string,
  phone: string;
  email: string;
};

export type ErrorsType = {
  useid: string;
  password: string;
  confirmPassword: string;
  username: string;
  birth: string;
  telecom:string,
  phone: string;
  email: string;
};

export const Errors = (form: FormType): ErrorsType => {
  let newErrors: ErrorsType = {
    useid: "",
    password: "",
    confirmPassword: "",
    username: "",
    birth: "",
    telecom:"",
    phone: "",
    email: "",
  };

  if (!form.useid) {
    newErrors.useid = "아이디는 필수 정보입니다.";
  }

  if (!form.password) {
    newErrors.password = "비밀번호는 필수 정보입니다.";
  }

  if (!form.confirmPassword) {
    newErrors.confirmPassword = "비밀번호 확인 필수 정보입니다.";
  }
  if (
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword
  ) {
    newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }

  if (!form.username) {
    newErrors.username = "이름은 필수 정보입니다.";
  }

  if (!form.birth) {
    newErrors.birth = "생년월일은 필수 정보입니다.";
  }

  if(!form.telecom){
    newErrors.telecom = "통신사 선택해주세요."
  }
  
  if (!form.phone) {
    newErrors.phone = "전화번호는 필수 정보입니다.";
  }

  if (!form.email) {
    newErrors.email = "이메일은 필수 정보입니다.";
  }

  return newErrors;
}