import { useState } from 'react';
import './RegionPicker.css';

interface RegionPickerProps {
  onSelect: (region: string, subRegion: string) => void;
  onClose: () => void;
}

export function RegionPicker({ onSelect, onClose }: RegionPickerProps) {
  const [selectedRegion, setSelectedRegion] = useState('인기지역');

  const regions = [
    '인기지역', '경기', '강원', '충남', '충북', '경남', '경북', '전남', '전북', '인천'
  ];

  const subRegions: { [key: string]: string[] } = {
    '인기지역': ['충천군', '강릉군', '포천시', '거평군', '연천군', '양평군'],
    '경기': ['가평군', '양평군', '포천시', '연천군', '남양주시', '여주시'],
    '강원': ['강릉시', '속초시', '홍천군', '평창군', '춘천시', '원주시'],
    '충남': ['태안군', '보령시', '서산시', '당진시', '공주시', '아산시'],
    '충북': ['제천시', '단양군', '충주시', '음성군', '진천군', '청주시'],
    '경남': ['거제시', '통영시', '남해군', '고성군', '산청군', '하동군'],
    '경북': ['경주시', '포항시', '안동시', '울진군', '영덕군', '청송군'],
    '전남': ['여수시', '순천시', '담양군', '곡성군', '구례군', '광양시'],
    '전북': ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시'],
    '인천': ['강화군', '옹진군', '중구', '동구', '미추홀구', '연수구']
  };

  const handleSubRegionClick = (subRegion: string) => {
    onSelect(selectedRegion, subRegion);
    onClose();
  };

  return (
    <div className="region-container">
      <div className="region-header">
        <h3 className="region-title">지역을 선택해 주세요</h3>
        <button onClick={onClose} className="region-reset-button">
          초기화
        </button>
      </div>

      <div className="region-tabs">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`region-tab-button ${selectedRegion === region ? 'active' : ''}`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="region-grid">
        {subRegions[selectedRegion]?.map((subRegion) => (
          <button
            key={subRegion}
            onClick={() => handleSubRegionClick(subRegion)}
            className="region-subregion-button"
          >
            {subRegion}
          </button>
        ))}
      </div>
    </div>
  );
}
