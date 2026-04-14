import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="header-inner">
      <span className="header-logo">CAMPING NOW</span>
      <nav className="header-nav">
        <a href="#" className="header-link">로그인</a>
        <Link to="/signup" className="header-link">회원가입</Link>
      </nav>
    </div>
  </header>
);

export default Header;
