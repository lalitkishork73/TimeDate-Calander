import React, { useState, useEffect } from 'react';
import style from './styles.module.css';
import moment from 'moment-timezone';
import { useSwipe } from '../../context/swipeContext';
import { useTimezone } from '../../context/timzoneContext';

function Header() {
  const { state, goToPreviousWeek, goToNextWeek } = useSwipe();
  const { timezone, setAppTimezone } = useTimezone();
  const [currentDateUTC0, setCurrentDateUTC0] = useState(getFormattedDate('Europe/London'));
  const [currentDateSelected, setCurrentDateSelected] = useState(getFormattedDate(timezone));

  function getFormattedDate(selectedTimezone) {
    return moment().tz(selectedTimezone).format('MMM D YYYY');
  }

  useEffect(() => {
    setCurrentDateUTC0(getFormattedDate('Europe/London'));
    setCurrentDateSelected(getFormattedDate(timezone));
  }, [timezone, state.currentWeek]);

  const handlePrev = () => {
    const prevWeek = state.currentWeek.clone().subtract(1, 'week');
    goToPreviousWeek(prevWeek);
  };

  const handleNext = () => {
    const nextWeek = state.currentWeek.clone().add(1, 'week');
    goToNextWeek(nextWeek);
  };

  const handleTimezoneChange = (event) => {
    const selectedTimezone = event.target.value;
    setAppTimezone(selectedTimezone);
    setCurrentDateSelected(getFormattedDate(selectedTimezone));
  };

  return (
    <>
      <header className={style.headerContainer}>
        <div className={style.swipeOuter}>
          <button onClick={handlePrev}>
            <i className="fa-solid fa-caret-left"></i>
            &nbsp;&nbsp;
            Previous Week
          </button>
          <p>{timezone === 'Europe/London' ? currentDateUTC0 : currentDateSelected}</p>
          <button onClick={handleNext}>
            Next Week
            &nbsp;&nbsp;
            <i className="fa-solid fa-caret-right"></i>
          </button>
        </div>
        <div className={style.timezoneOption}>
          <label htmlFor="timezone"> Timezone:</label>
          <select
            name="timezone"
            id="timezone"
            className={style.selectOption}
            onChange={handleTimezoneChange}
            value={timezone}
          >
            <option value="Europe/London">[UTC-0] Coordinated Universal Time</option>
            <option value="Asia/Kolkata">[UTC-5] Eastern Standard Time</option>
            <option value="America/Los_Angeles">[UTC-8] American Standard Time</option>
          </select>
        </div>
      </header>
    </>
  );
}

export default Header;
