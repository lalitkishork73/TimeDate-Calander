import React, { useCallback } from 'react';
import style from './styles.module.css';
import { useSwipe } from '../../context/swipeContext';
import { data } from '../../data/data';
import moment from 'moment-timezone';

function Main() {
  const morningTime = [
    '8.00 AM', '8.30 AM', '9.30 AM', '10.00 AM', '10.30 AM', '11.00 AM', '11.30 AM'
  ];
  const afternoonTime = [
    '12.00 PM', '12.30 PM', '1.00 PM', '1.30 PM', '2.00 PM', '2.30 PM', '3.00 PM',
    '3.30 PM', '4.00 PM', '4.30 PM', '5.00 PM', '5.30 PM', '6.00 PM', '6.30 PM',
    '7.00 PM', '7.30 PM', '8.00 PM', '8.30 PM', '9.00 PM', '9.30 PM', '10.00 PM',
    '10.30 PM', '11.00 PM'
  ];

  const { state } = useSwipe();

  const renderCheckbox = useCallback((hour, index, startOfWeek) => (
    <input
      type="checkbox"
      name="checkbox"
      checked={data.some(data =>
        moment(`${data.Date} ${data.Time}`, 'YYYY-MM-DD HH:mm').isSame(
          startOfWeek.clone().add(index * 30 + (hour.includes('PM') ? 12 * 60 : 0), 'minutes'), 'minute'
        )
      )}
      readOnly
    />
  ), [data, state.currentWeek]);

  const renderDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const startOfWeek = state.currentWeek.clone().startOf('isoweek').add(i, 'day');
      const isPastDate = startOfWeek.isBefore(today, 'day');
      const isCurrentDate = startOfWeek.isSame(today, 'day');

      days.push(
        <div className={`${style.innerlayer} ${isCurrentDate ? style.currentDate : ''}`} key={i}>
          <div className={style.days}>
            <p className={style.day}>{startOfWeek.format('ddd')}</p>
            <p className={style.daydate}>{startOfWeek.format('MMM D')}</p>
          </div>
          <div className={style.appoitment}>
            <div className={style.dayAM}>
              {morningTime.map((hour, index) => (
                <div className={style.container} key={index}>
                  {isPastDate ? (
                    <span className={style.pastText}>Past</span>
                  ) : (
                    <>
                      {renderCheckbox(hour, index, startOfWeek)}
                      &nbsp;&nbsp;&nbsp;
                      <label htmlFor="">{hour}</label>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className={style.dayPM}>
              {afternoonTime.map((hour, index) => (
                <div className={style.container} key={index}>
                  {isPastDate ? (
                    <span className={style.pastText}>   </span>
                  ) : (
                    <>
                      {renderCheckbox(hour, index, startOfWeek)}
                      &nbsp;&nbsp;&nbsp;
                      <label htmlFor="">{hour}</label>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div >
      );
    }

    return days;
  };

  return (
    <>
      <section className={style.main}>
        <div className={`${style.outerlayer}`}>{renderDays()}</div>
      </section>
    </>
  );
}

export default Main;
