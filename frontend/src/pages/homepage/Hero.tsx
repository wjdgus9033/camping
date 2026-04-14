import './Hero.css';

const heroImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

const Hero = () => (
  <section className="hero">
    <img className="hero-bg" src={heroImg} alt="캠핑 메인" />
    <div className="hero-overlay" />
    <div className="hero-content">
      <h1>전국 캠핑장을</h1>
      <h1>한 번에 예약하세요</h1>
    </div>
  </section>
);

export default Hero;
