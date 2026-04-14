import Header from '../../components/Header';
import Hero from './Hero';
import { SearchBar } from './searchbar/SearchBar';
import CampCardList from './campcard/CampCardList';
import Footer from '../../components/Footer';
import './Homepage.css';

const Homepage = () => (
  <div className="homepage-root">
    <Header />
    <div className="hero-section">
      <Hero />
      <div className="searchbar-overlap">
        <SearchBar />
      </div>
    </div>
    <CampCardList />
    <Footer />
  </div>
);

export default Homepage;
