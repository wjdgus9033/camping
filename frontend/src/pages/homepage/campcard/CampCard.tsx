import './CampCard.css';

interface CampCardProps {
  name: string;
  location: string;
  features: string;
  price: string;
  image: string;
}

const CampCard = ({ name, location, features, price, image }: CampCardProps) => (
  <div className="camp-card">
    <img src={image} alt={name} />
    <div className="camp-info">
      <h3>{name}</h3>
      <p className="camp-location">{location}</p>
      <p className="camp-desc">{features}</p>
      <div className="camp-card-footer">
        <span className="camp-price">{price} <span style={{fontWeight:400, fontSize:'14px'}}>/ 1박</span></span>
        <button className="camp-reserve-btn">예약하기</button>
      </div>
    </div>
  </div>
);

export default CampCard;
