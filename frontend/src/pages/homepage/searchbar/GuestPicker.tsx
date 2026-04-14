import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import './GuestPicker.css';

interface GuestPickerProps {
  onSelect: (adults: number, teenagers: number, children: number) => void;
  onClose: () => void;
}

export function GuestPicker({ onSelect, onClose }: GuestPickerProps) {
  const [adults, setAdults] = useState(2);
  const [teenagers, setTeenagers] = useState(0);
  const [children, setChildren] = useState(0);

  const handleSubmit = () => {
    onSelect(adults, teenagers, children);
    onClose();
  };

  return (
    <div className="guest-container">
      <div className="guest-header">
        <h3 className="guest-title">인원을 선택해 주세요</h3>
        <button onClick={onClose} className="guest-reset-button">
          초기화
        </button>
      </div>

      <div className="guest-list">
        <div className="guest-row">
          <span className="guest-label">성인</span>
          <div className="guest-controls">
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="guest-control-button"
            >
              <Minus className="guest-icon" />
            </button>
            <span className="guest-count">{adults}</span>
            <button
              onClick={() => setAdults(adults + 1)}
              className="guest-control-button"
            >
              <Plus className="guest-icon" />
            </button>
          </div>
        </div>

        <div className="guest-row">
          <span className="guest-label">청소년</span>
          <div className="guest-controls">
            <button
              onClick={() => setTeenagers(Math.max(0, teenagers - 1))}
              className="guest-control-button"
            >
              <Minus className="guest-icon" />
            </button>
            <span className="guest-count">{teenagers}</span>
            <button
              onClick={() => setTeenagers(teenagers + 1)}
              className="guest-control-button"
            >
              <Plus className="guest-icon" />
            </button>
          </div>
        </div>

        <div className="guest-row">
          <span className="guest-label">미취학 아동</span>
          <div className="guest-controls">
            <button
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="guest-control-button"
            >
              <Minus className="guest-icon" />
            </button>
            <span className="guest-count">{children}</span>
            <button
              onClick={() => setChildren(children + 1)}
              className="guest-control-button"
            >
              <Plus className="guest-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
