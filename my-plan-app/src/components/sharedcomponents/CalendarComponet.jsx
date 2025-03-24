import React, { useState, useEffect, useCallback } from 'react';
import '../../assets/Calendar.css';

const CalendarComponent = ({ showDetails }) => {
  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const daysOfTheWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const now = new Date();
  const today = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const [currentDate, setCurrentDate] = useState(now);
  const [calendarGrid, setCalendarGrid] = useState([]);

  const generateCalendar = useCallback(() => {
    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const newCalendarGrid = [];

    // Add weekdays to the calendar grid
    daysOfTheWeek.forEach((day) => {
      newCalendarGrid.push({ type: 'weekday', label: day });
    });

    // Add empty days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
      newCalendarGrid.push({ type: 'empty' });
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

      newCalendarGrid.push({
        type: 'day',
        day: i,
        date: formattedDate,
        isToday: i === today && currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear
      });
    }

    setCalendarGrid(newCalendarGrid);
  }, [currentDate]);

  useEffect(() => {
    generateCalendar(); // Call to generate the calendar
  }, [currentDate, generateCalendar]);

  const getMonthTitle = () => {
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <section className="container mt-4">
      <div className="card p-4 shadow">
        <div className="calendar-header d-flex justify-content-between align-items-center">
          <span
            className="prev-arrow cursor-pointer"
            onClick={() => changeMonth(-1)}
          >
            &larr;
          </span>
          <h3 className="tasks-title">{getMonthTitle()}</h3>
          <span
            className="next-arrow cursor-pointer"
            onClick={() => changeMonth(1)}
          >
            &rarr;
          </span>
        </div>
        <div className="calendar-grid d-grid grid-template-columns-7 gap-2">
          {calendarGrid.map((item, index) => {
            if (item.type === 'weekday') {
              return (
                <div key={index} className="weekday text-center fw-bold">
                  {item.label}
                </div>
              );
            }
            if (item.type === 'empty') {
              return <div key={index} className="empty-day"></div>;
            }
            if (item.type === 'day') {
              return (
                <div
                  key={index}
                  className={`day-container ${item.isToday ? 'today' : ''}`}
                  data-date={item.date}
                  onClick={showDetails ? () => showDetails(item.date) : null}
                >
                  {item.day}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default CalendarComponent;
