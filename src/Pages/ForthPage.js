import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'

function ForthPage() {

    const selectedStartDate = JSON.parse(window.localStorage.getItem('selectedStartDate'));
    const selectedEndDate = JSON.parse(window.localStorage.getItem('selectedEndDate'));
    const selectedPeople = JSON.parse(window.localStorage.getItem('selectedPeople'));
    const selectedDayDifference = JSON.parse(window.localStorage.getItem('selectedDayDifference'));
    const selectedHotelName = window.localStorage.getItem('selectedHotel');
    const selectedRoomType = window.localStorage.getItem('selectedRoomType');
    const selectedRoomScene = window.localStorage.getItem('selectedRoomScene')
    const selectedPrice = JSON.parse(window.localStorage.getItem('selectedPrice'))


    const clear=()=>{
        localStorage.clear()
    }

    const newReservation=()=>{
        localStorage.clear()
    }
    return (
        <div className="App">
            <h1>RESERVATION IS DONE! THANK YOU FOR RESERVATION FROM US!</h1>
            <strong>Selected Hotel Name:</strong><p>{selectedHotelName}</p>
            <strong>Selected Start Date:</strong> <p>{selectedStartDate}</p>
            <strong>Selected End Date:</strong> <p> {selectedEndDate}</p>
            <strong>Selected People:</strong><p> {selectedPeople}</p>
            <strong>Selected Day Difference:</strong><p> {selectedDayDifference}</p>
            <strong>Selected Room Type: </strong><p>{selectedRoomType}</p>
            <strong>Selected Room Scene: </strong><p>{selectedRoomScene}</p>
            <strong>Price: </strong><p>{selectedPrice}</p>


            <button onClick={newReservation}><Link to="/">NEW RESERVATION</Link></button>
            <button onClick={clear}><Link to="/fifth-page">CANCEL</Link></button>
            <button><Link to="/third-page">BACK</Link></button>
        </div>
    )
}

export default ForthPage
