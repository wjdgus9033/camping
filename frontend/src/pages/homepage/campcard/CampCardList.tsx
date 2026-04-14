import CampCard from './CampCard';
import { campingList } from '../../../CampingData'

import './CampCardList.css';

function CampCardList() {
  return (
    <section className="camp-card-list">
      {campingList.map((camp, idx) => (
        <CampCard key={camp.name + idx} {...camp} />
      ))}
    </section>
  );
}
export default CampCardList;
