import React, { useState, useEffect } from 'react';
import Hotels from '../hotels.json'

function HotelSelect({ onSelectHotel }) {
  const [selectedHotel, setSelectedHotel] = useState('');

  useEffect(() => {
    const storedHotel = localStorage.getItem('selectedHotel');
    if (storedHotel) {
      /* const hotel = Hotels.find((hotel) => hotel.hotel_name === storedHotel); */
      fetch('../hotels.json')
        .then((response) => response.json())
        .then((hotels) => {
          for (const hotel of hotels) {
            if (hotel.hotel_name === storedHotel) {
              setSelectedHotel(hotel);
              onSelectHotel(hotel.hotel_name);
              break;
            }
          }
        }

        )
        .catch((error) => {
          console.error('Hotel data fetch error:', error);
        });
    }
  }, [onSelectHotel]);

  const handleHotelSelect = (event) => {
    const selectedHotelId = event.target.value;
    /*     const hotel = Hotels.find((hotel) => hotel.id === selectedHotelId);
     */
    fetch('../hotels.json')
      .then((response) => response.json())
      .then((hotels) => {
        for (const hotel of hotels) {
          if (hotel.id === selectedHotelId) {
            setSelectedHotel(hotel);
            onSelectHotel(hotel.hotel_name);
            localStorage.setItem('selectedHotel', hotel.hotel_name);
            break;
          }
        }
      }

      )
      .catch((error) => {
        console.error('Hotel data fetch error:', error);
      });
    /* setSelectedHotel(hotel);
    onSelectHotel(hotel.hotel_name);
    localStorage.setItem('selectedHotel', hotel.hotel_name); */
  };

  return (
    <div>
      <h3 style={{ fontSize: '25px', color: '#53007d' }}>Hotel</h3>

      <select onChange={handleHotelSelect}
        value={selectedHotel ? selectedHotel.id : ''}
        style={{
          width: '100%',
          height: '40px',
          fontSize: '18px',
          padding: '5px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: 'rgba(212, 180, 210, 0.8)',
          color: '#53007D', fontWeight: 'bold'
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        {Hotels.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.hotel_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HotelSelect;
