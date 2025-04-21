// CalendarComponent: A calendar that displays the current month with days of the week and the ability to navigate between months. 
// The current day is highlighted, and if a `showDetails` function is provided, users can click on a day to view additional information.


import React, { useState, useEffect, useCallback } from 'react';

const CalendarComponent = ({ showDetails }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarGrid, setCalendarGrid] = useState([]);
  const [theme, setTheme] = useState(document.body.classList.contains('dark-mode') ? 'dark' : 'light');


  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const generateCalendar = useCallback(() => {
    const firstDayIndex = (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() + 6) % 7;

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const newCalendarGrid = [];

    
    daysOfTheWeek.forEach((day) => newCalendarGrid.push({ type: 'weekday', label: day }));

    for (let i = 0; i < firstDayIndex; i++) newCalendarGrid.push({ type: 'empty' });

    for (let i = 1; i <= daysInMonth; i++) {
      newCalendarGrid.push({
        type: 'day',
        day: i,
        date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        isToday: i === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear()
      });
    }

    setCalendarGrid(newCalendarGrid);
  }, [currentDate]);

  useEffect(() => generateCalendar(), [currentDate]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  return (
    <section className={`calendar-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <div className="calendar-header">
        <span className="prev-arrow" onClick={() => changeMonth(-1)}>&larr;</span>
        <h3 className="month-title">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <span className="next-arrow" onClick={() => changeMonth(1)}>&rarr;</span>
      </div>
      <div className="calendar-grid">
        {calendarGrid.map((item, index) => {
          if (item.type === 'weekday') return <div key={index} className="weekday">{item.label}</div>;
          if (item.type === 'empty') return <div key={index} className="empty-day"></div>;
          return (
            <div
              key={index}
              className={`day-container ${item.isToday ? 'today' : ''}`}
              onClick={showDetails ? () => showDetails(item.date) : undefined}
            >
              {item.day}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CalendarComponent;
