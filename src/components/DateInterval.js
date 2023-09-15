import React, { useEffect, useState } from 'react';

const Calendar = ({ onSelectStartDate, onSelectEndDate, onSelectDayDifference }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dayDifference, setDayDifference] = useState(null);

  useEffect(() => {
    const storedStartDate = JSON.parse(localStorage.getItem('selectedStartDate'));
    const storedEndDate = JSON.parse(localStorage.getItem('selectedEndDate'));

    if (storedStartDate) {
      setStartDate(storedStartDate);
      onSelectStartDate(storedStartDate);
    }

    if (storedEndDate) {
      setEndDate(storedEndDate);
      onSelectEndDate(storedEndDate);
    }

    if (storedStartDate && storedEndDate) {
      calculateDateDifference(storedStartDate, storedEndDate);
    }
  }, [onSelectStartDate, onSelectEndDate, onSelectDayDifference]);


  useEffect(() => {
    if (startDate && endDate) {
      calculateDateDifference(startDate, endDate);
    }
  }, [startDate, endDate]);

  function calculateDateDifference(start, end) {
    const parsedStartDate = new Date(start);
    const parsedEndDate = new Date(end);

    const differenceTime = Math.abs(parsedEndDate - parsedStartDate);
    const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
    setDayDifference(differenceDays);
    onSelectDayDifference(differenceDays);
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div>
        <h3 style={{ fontSize: '25px', color: '#53007d' }}>Start Date</h3>
        <input
          type="date"
          value={startDate}
          min={today}
          onChange={(e) => {
            setStartDate(e.target.value);
            localStorage.setItem('selectedStartDate', JSON.stringify(e.target.value));
          }}
          style={{
            width: '100%',
            height: '40px',
            fontSize: '18px',
            padding: '5px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: 'rgba(212, 180, 210, 0.8)',
            color: '#53007D',
            fontWeight: 'bold'
          }}
        />
      </div>

      <div>
        <h3 style={{ fontSize: '25px', color: '#53007d' }}>End Date</h3>
        <input
          type="date"
          value={endDate}
          min={startDate || today}
          onChange={(e) => {
            setEndDate(e.target.value);
            localStorage.setItem('selectedEndDate', JSON.stringify(e.target.value));
          }}
          style={{
            width: '100%',
            height: '40px',
            fontSize: '18px',
            padding: '5px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: 'rgba(212, 180, 210, 0.8)',
            color: '#53007D',
            fontWeight: 'bold'
          }}
        />
        <h3 style={{ fontSize: '25px', color: '#53007d' }}>Day Difference</h3>
        <div
          style={{
            width: '100%',
            height: '40px',
            fontSize: '18px',
            padding: '5px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: 'rgba(212, 180, 210, 0.8)',
            color: '#53007D',
            fontWeight: 'bold'
          }}
        >
          {dayDifference}
        </div>
      </div>
    </>
  );
};

export default Calendar;
