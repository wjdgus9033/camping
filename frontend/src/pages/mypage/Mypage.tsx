import { useEffect, useState } from "react";
import { getMyInfoApi } from "../../api/auth";

const Mypage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMyInfoApi();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>로딩중...</div>;

  return (
    <div>
      <h1>마이페이지</h1>
      <p>아이디: {user.userid}</p>
      <p>이름: {user.username}</p>
      <p>전화번호: {user.phone}</p>
      <p>이메일: {user.email}</p>
    </div>
  );
};

export default Mypage;