import { useState, useRef, useEffect } from 'react';
import { Calendar, Users, SlidersHorizontal, Search, MapPin } from 'lucide-react';
import { RegionPicker } from './RegionPicker';
import { SimpleDatePicker } from './SimpleDatePicker';
import { GuestPicker } from './GuestPicker';
import './SearchBar.css';

export function SearchBar() {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<'main' | 'region' | 'date' | 'guest'>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [guests, setGuests] = useState('성인 2명');
  const modalRef = useRef<HTMLDivElement>(null);

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const formatDateDisplay = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = weekDays[date.getDay()];
    return `${month}.${day} (${dayOfWeek})`;
  };

  const handleRegionSelect = (regionName: string, subRegion: string) => {
    setRegion(`${subRegion}`);
    setCurrentStep('main');
  };

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDateRange(`${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)} (${nights}박)`);
    setCurrentStep('main');
  };

  const handleGuestSelect = (adults: number, teenagers: number, children: number) => {
    const parts = [];
    if (adults > 0) parts.push(`성인 ${adults}명`);
    if (teenagers > 0) parts.push(`청소년 ${teenagers}명`);
    if (children > 0) parts.push(`아동 ${children}명`);
    setGuests(parts.join(', ') || '성인 2명');
    setCurrentStep('main');
  };

  const handleSearch = () => {
    setShowModal(false);
    setCurrentStep('main');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
        setCurrentStep('main');
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="search-wrapper">
      {!showModal && (
        <div onClick={() => setShowModal(true)} className="search-compact-bar">
          <Search className="search-icon" />
          <div className="search-compact-content">
            <div className="search-compact-title">어디로 떠날까요?</div>
            <div className="search-compact-subtitle">일정 인원 필터</div>
          </div>
          <div className="search-icon-group">
            <div className="search-icon-button">
              <Calendar className="search-icon-small" />
            </div>
            <div className="search-icon-button">
              <Users className="search-icon-small" />
            </div>
            <div className="search-icon-button">
              <SlidersHorizontal className="search-icon-small" />
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div ref={modalRef} className="search-modal">
          <h2 className="search-modal-title">캠퍼 님, 어디로 떠날까요?</h2>

          <div className="search-input-wrapper">
            <div className="search-input-container">
              <Search className="search-input-icon" />
              <input
                type="text"
                placeholder="숙소 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {currentStep === 'main' && (
              <div className="search-recent">
                <div className="search-recent-header">
                  <span className="search-recent-title">최근 검색 내역</span>
                  <button className="search-clear-button">전체삭제</button>
                </div>
                <div className="search-empty-state">
                  최근 검색어가 없어요
                </div>
              </div>
            )}
          </div>

          {currentStep === 'main' && (
            <div className="search-options">
              <button
                onClick={() => setCurrentStep('region')}
                className="search-option-button"
              >
                <div className="search-option-left">
                  <MapPin className="search-option-icon" />
                  <span className="search-option-label">지역</span>
                </div>
                <span className="search-option-value">{region || '지역 추가'}</span>
              </button>

              <button
                onClick={() => setCurrentStep('date')}
                className="search-option-button"
              >
                <div className="search-option-left">
                  <Calendar className="search-option-icon" />
                  <span className="search-option-label">날짜</span>
                </div>
                <span className="search-option-value">{dateRange || '날짜 추가'}</span>
              </button>

              <button
                onClick={() => setCurrentStep('guest')}
                className="search-option-button"
              >
                <div className="search-option-left">
                  <Users className="search-option-icon" />
                  <span className="search-option-label">인원</span>
                </div>
                <span className="search-option-value">{guests}</span>
              </button>

              <button 
                onClick={handleSearch}
                className="search-button"
              >
                캠핑장 검색
              </button>
            </div>
          )}

          {currentStep === 'region' && (
            <>
              <RegionPicker
                onSelect={handleRegionSelect}
                onClose={() => setCurrentStep('main')}
              />
              <button 
                onClick={() => setCurrentStep('main')}
                className="search-back-button"
              >
                뒤로
              </button>
            </>
          )}

          {currentStep === 'date' && (
            <>
              <SimpleDatePicker
                onSelect={handleDateSelect}
                onClose={() => setCurrentStep('main')}
              />
              <button 
                onClick={() => setCurrentStep('main')}
                className="search-back-button"
              >
                뒤로
              </button>
            </>
          )}

          {currentStep === 'guest' && (
            <>
              <GuestPicker
                onSelect={handleGuestSelect}
                onClose={() => setCurrentStep('main')}
              />
              <button 
                onClick={() => setCurrentStep('main')}
                className="search-back-button"
              >
                뒤로
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
