import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  onSelect: (checkIn: Date, checkOut: Date) => void;
  onClose: () => void;
}

export function DateRangePicker({ onSelect, onClose }: DateRangePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
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
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const isDateInRange = (day: number, monthOffset: number) => {
    if (!startDate) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );
    if (endDate) {
      return date > startDate && date < endDate;
    }
    return false;
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

  const getNights = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    if (startDate && endDate) {
      onSelect(startDate, endDate);
      onClose();
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const renderCalendar = (monthOffset: number) => {
    const displayDate = monthOffset === 0 ? currentDate : getNextMonth(currentDate);
    const days = getDaysInMonth(displayDate);

    return (
      <div className="flex-1">
        <div className="text-center font-bold mb-4">
          {displayDate.getFullYear()}년 {monthNames[displayDate.getMonth()]}
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} />;
            }

            const inRange = isDateInRange(day, monthOffset);
            const isStart = isStartDate(day, monthOffset);
            const isEnd = isEndDate(day, monthOffset);

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day, monthOffset)}
                className={`
                  aspect-square flex items-center justify-center rounded
                  transition-colors
                  ${isStart || isEnd ? 'bg-blue-600 text-white font-semibold' : ''}
                  ${inRange ? 'bg-blue-200 text-blue-900' : ''}
                  ${!isStart && !isEnd && !inRange ? 'hover:bg-gray-100' : ''}
                `}
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
    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl p-6 z-50 w-full max-w-[800px]">
      <div className="flex gap-8 mb-6">
        {/* 왼쪽 화살표 */}
        <button
          onClick={handlePrevMonth}
          className="absolute left-6 top-6 p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* 첫 번째 달력 */}
        {renderCalendar(0)}

        {/* 구분선 */}
        <div className="w-px bg-gray-200" />

        {/* 두 번째 달력 */}
        {renderCalendar(1)}

        {/* 오른쪽 화살표 */}
        <button
          onClick={handleNextMonth}
          className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 하단 정보 및 버튼 */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="font-medium">
          {startDate && endDate ? (
            <>
              숙박 기간: <span className="font-bold">{formatDate(startDate)} - {formatDate(endDate)}</span> ({getNights()}박)
            </>
          ) : (
            <span className="text-gray-400">날짜를 선택해주세요</span>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={handleSubmit}
            disabled={!startDate || !endDate}
            className={`px-6 py-2 rounded-lg transition-colors ${
              startDate && endDate
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}