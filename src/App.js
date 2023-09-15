import './App.css';
import React, { useState,useEffect } from 'react';
import HotelSelect from './components/HotelSelect';
import DateInterval from './components/DateInterval'
import PeopleNumber from './components/PeopleNumber';
import Hotels from './hotels.json'
import { Link } from 'react-router-dom';
function App() {

  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedDayDiff, setSelectedDayDiff] = useState(0)
  const [selectedPeopleCount, setSelectedPeopleCount] = useState('');

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };
  const handleStartDay = (startDate) => {
    setSelectedStartDate(startDate)
  }
  const handleEndDate = (endDate) => {
    setSelectedEndDate(endDate)
  }
  const handleDateRangeSelect = (dateRange) => {
    setSelectedDayDiff(dateRange);
  };

  const handlePeopleSelect = (people) => {
    setSelectedPeopleCount(people);
  };


  const canProceed = selectedHotel !== '' && selectedStartDate !== '' && selectedEndDate !== '' && selectedDayDiff !== 0 && selectedPeopleCount >= 0 && selectedPeopleCount <= 5
  const handleNext = () => {
    if (selectedHotel !== '' && selectedStartDate !== '' && selectedEndDate !== '' && selectedDayDiff !== 0 && selectedPeopleCount >= 0 && selectedPeopleCount <= 5) {
      localStorage.setItem('selectedHotel', selectedHotel);
      localStorage.setItem('selectedStartDate', JSON.stringify(selectedStartDate));
      localStorage.setItem('selectedEndDate', JSON.stringify(selectedEndDate));
      localStorage.setItem('selectedDayDifference', JSON.stringify(selectedDayDiff));
      localStorage.setItem('selectedPeople', selectedPeopleCount.toString());
    } else {
      alert('Please fill in all required fields.');
    }
  };
  
  return (
    <div className="App">
      <div className='Form'>
        <HotelSelect onSelectHotel={handleHotelSelect}/>
        <DateInterval onSelectDayDifference={handleDateRangeSelect} onSelectStartDate={handleStartDay} onSelectEndDate={handleEndDate} />
        <h3 style={{ fontSize: '25px', color: '#53007d' }}>How many people?</h3>
        <PeopleNumber onSelectPeopleNum={handlePeopleSelect}/>
        <button onClick={handleNext}
          style={{
            backgroundColor: canProceed ? '#53007D' : '#ccc',
            width: '100%',
            height: '40px',
            fontSize: '20px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: canProceed ? 'pointer' : 'not-allowed',
            margin: '30px',
            marginLeft: '4px'
          }}
        ><Link to={canProceed ? "/second-page" : "/"} style={{ color: 'white', textDecorationLine: 'none' }}>NEXT</Link></button>
      </div>
    </div>
  );
}

export default App;
