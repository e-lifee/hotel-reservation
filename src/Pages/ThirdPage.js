import React, { useState,useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Link } from "react-router-dom";
import '../App.css'

const CreditCards = () => {
  const initialData = {
    cvc: "",
    expiry: "",
    name: "",
    number: ""
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("creditCardData"));
    if (savedData) {
      setData(savedData);
    }
  }, []);
  
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const canProceed=data.cvc!=''&&data.expiry!=''&&data.name!=''&&data.number!=''

  const selectedStartDate = JSON.parse(window.localStorage.getItem('selectedStartDate'));
  const selectedEndDate = JSON.parse(window.localStorage.getItem('selectedEndDate'));
  const selectedPeople = JSON.parse(window.localStorage.getItem('selectedPeople'));
  const selectedDayDifference = JSON.parse(window.localStorage.getItem('selectedDayDifference'));
  const selectedHotelName = window.localStorage.getItem('selectedHotel');
  const selectedRoomType = window.localStorage.getItem('selectedRoomType')
  const selectedRoomScene = window.localStorage.getItem('selectedRoomScene')
  const selectedPrice = window.localStorage.getItem('selectedPrice')

  useEffect(() => {
    localStorage.setItem("creditCardData", JSON.stringify(data));
  }, [data]);

  return (
    <div className="App">
      <div>
        <h2>Third Page</h2>
        <p>Selected Start Date: {selectedStartDate}</p>
        <p>Selected End Date: {selectedEndDate}</p>
        <p>Selected People: {selectedPeople}</p>
        <p>Selected Day Difference: {selectedDayDifference}</p>
        <p>Selected Hotel: {selectedHotelName}</p>
        <p>Selected Room Type: {selectedRoomType}</p>
        <p>Selected Room Scene: {selectedRoomScene}</p>
        <p>Total Price: {selectedPrice}</p>
      </div>
      <div id="PaymentForm">
        <Cards
          cvc={data.cvc}
          expiry={data.expiry}
          focus={data.focus}
          name={data.name}
          number={data.number}
        />
        <form action="">
          <input
            type="number"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            value={data.cvc}
          />
          <input
            type="date"
            name="expiry"
            placeholder="Expire Date"
            onChange={handleInputChange}
            value={data.expiry}
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleInputChange}
            value={data.name}
          />
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            onChange={handleInputChange}
            value={data.number}
          />
        </form>
        <button><Link to="/second-page">BACK</Link></button>
        <button><Link to={canProceed?"/forth-page":"/third-page"} onClick={()=>{if(!canProceed){alert("lütfen tüm değerleri giriniz")}}}>NEXT</Link></button>
      </div>
    </div>
  );
};
export default CreditCards;
