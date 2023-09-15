import React, { useState, useEffect } from 'react';

function PeopleNumber({ onSelectPeopleNum }) {
  const [peopleNumber, setPeopleNumber] = useState(1);

  useEffect(() => {
    const storedPeopleCount = parseInt(localStorage.getItem('selectedPeople'), 10);
    if (!isNaN(storedPeopleCount)) {
      setPeopleNumber(storedPeopleCount);
      onSelectPeopleNum(storedPeopleCount);
    }
  }, [onSelectPeopleNum]);

  const handlePeopleSelect = (event) => {
    const selectedPeopleNum = parseInt(event.target.value, 10);
    setPeopleNumber(selectedPeopleNum);
    onSelectPeopleNum(selectedPeopleNum);
    localStorage.setItem('selectedPeople', selectedPeopleNum.toString());
  };

  return (
    <div>
      <input
        type="number"
        onChange={handlePeopleSelect}
        value={peopleNumber}
        placeholder="Only b/w 1-5"
        min={1}
        max={5}
        style={{
          width: '100%',
          height: '40px',
          fontSize: '18px',
          padding: '5px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: 'rgba(212, 180, 210, 0.8)',
          color:'#53007D',fontWeight:'bold'
        }}
      />
    </div>
  );
}

export default PeopleNumber;
