import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">CAMPING NOW</Link>

        <nav className="header-nav">
          {!user ? (
            <>
              <Link to="/signup" className="header-link">회원가입</Link>
              <Link to="/login" className="header-link">로그인</Link>
            </>
          ) : (
            <>
              <span className="header-user">
                {user.username}님
              </span>
              <Link to="/mypage" className="header-link">마이페이지</Link>
              <button onClick={logout} className="header-link button">로그아웃</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;