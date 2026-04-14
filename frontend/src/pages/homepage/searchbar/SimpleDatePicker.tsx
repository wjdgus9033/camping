import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './SimpleDatePicker.css';

interface SimpleDatePickerProps {
  onSelect: (startDate: Date, endDate: Date) => void;
  onClose: () => void;
}

export function SimpleDatePicker({ onSelect, onClose }: SimpleDatePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = [
    '01월', '02월', '03월', '04월', '05월', '06월',
    '07월', '08월', '09월', '10월', '11월', '12월'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getNextMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number, monthOffset: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (selectedDate > startDate) {
      setEndDate(selectedDate);
      onSelect(startDate, selectedDate);
      setTimeout(() => onClose(), 300);
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const isDateInRange = (day: number, monthOffset: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );
    return date > startDate && date < endDate;
  };

  const isStartDate = (day: number, monthOffset: number) => {
    if (!startDate) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );
    return date.toDateString() === startDate.toDateString();
  };

  const isEndDate = (day: number, monthOffset: number) => {
    if (!endDate) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );
    return date.toDateString() === endDate.toDateString();
  };

  const isSunday = (day: number, monthOffset: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );
    return date.getDay() === 0;
  };

  const renderCalendar = (monthOffset: number) => {
    const displayDate = monthOffset === 0 ? currentDate : getNextMonth(currentDate);
    const days = getDaysInMonth(displayDate);

    return (
      <div className="date-calendar">
        <div className="date-month-title">
          {displayDate.getFullYear()}년 {monthNames[displayDate.getMonth()]}
        </div>
        <div className="date-weekdays">
          {daysOfWeek.map((day, index) => (
            <div 
              key={day} 
              className={`date-weekday ${index === 0 ? 'sunday' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="date-days">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} />;
            }

            const inRange = isDateInRange(day, monthOffset);
            const isStart = isStartDate(day, monthOffset);
            const isEnd = isEndDate(day, monthOffset);
            const sunday = isSunday(day, monthOffset);

            let dayClasses = 'date-day';
            if (isStart || isEnd) {
              dayClasses += ' selected';
            } else if (inRange) {
              dayClasses += ' in-range';
            } else if (sunday) {
              dayClasses += ' sunday';
            } else {
              dayClasses += ' normal';
            }

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day, monthOffset)}
                className={dayClasses}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="date-container">
      <div className="date-header">
        <h3 className="date-title">언제 갈 예정이신가요?</h3>
        <button onClick={onClose} className="date-reset-button">
          초기화
        </button>
      </div>

      <div className="date-calendars">
        <button
          onClick={handlePrevMonth}
          className="date-nav-button prev"
        >
          <ChevronLeft className="date-nav-icon" />
        </button>

        {renderCalendar(0)}
        {renderCalendar(1)}

        <button
          onClick={handleNextMonth}
          className="date-nav-button next"
        >
          <ChevronRight className="date-nav-icon" />
        </button>
      </div>
    </div>
  );
}
