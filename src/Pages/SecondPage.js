import React, { useState, useEffect } from 'react';
import hotelDetails from '../hotelsDetails.json'
import hotels from '../hotels.json'
import { Link } from 'react-router-dom';
import '../App.css'
function SecondPage() {
    const selectedStartDate = JSON.parse(window.localStorage.getItem('selectedStartDate'));
    const selectedEndDate = JSON.parse(window.localStorage.getItem('selectedEndDate'));
    const selectedPeople = JSON.parse(window.localStorage.getItem('selectedPeople'));
    const selectedDayDifference = JSON.parse(window.localStorage.getItem('selectedDayDifference'));
    const selectedHotelName = window.localStorage.getItem('selectedHotel');

    const selectedHotel = hotels.find(hotel => hotel.hotel_name === selectedHotelName);
    let selectedHotelDetails = null;
    if (selectedHotel) {
        selectedHotelDetails = hotelDetails.find(detail => detail.id === selectedHotel.id);
    }

    const [selectedRoomType, setSelectedRoomType] = useState(localStorage.getItem('selectedRoomType') || '');
    const [selectedRoomScene, setSelectedRoomScene] = useState(localStorage.getItem('selectedRoomScene') || '');
    const [price, setPrice] = useState(0)

    const canProceed = selectedRoomType != '' && selectedRoomScene != ''

    const handleRoomTypeSelect = (roomId) => {
        setSelectedRoomType(roomId);
        console.log("Selected room type id: ", roomId);
    };

    const handleRoomSceneSelect = (roomSceneId) => {
        setSelectedRoomScene(roomSceneId);
        console.log("Selected room scene id: ", roomSceneId);

        const selectedRoomTypeObject = selectedHotelDetails.room_type.find(roomType => roomType.id === parseInt(selectedRoomType));
        const selectedRoomSceneObject = selectedHotelDetails.room_scenic.find(roomScene => roomScene.id === parseInt(roomSceneId));

        if (selectedRoomTypeObject && selectedRoomSceneObject) {
            calculatePrice(selectedRoomTypeObject.price, selectedRoomSceneObject.price_rate);
        } else {
            console.error("Selected room type or room scene not found.");
            setPrice(0);
        }
    };


    const calculatePrice = (roomTypePrice, sceneRate) => {
        const total = roomTypePrice + (roomTypePrice * (sceneRate / 100));
        setPrice(total);
    };

    const handleNext = () => {
        if (selectedRoomType != '' && selectedRoomScene != '') {
            if (selectedHotelDetails) {
                const selectedRoomTypeObject = selectedHotelDetails.room_type.find(roomType => roomType.id === parseInt(selectedRoomType));
                if (selectedRoomTypeObject) {
                    localStorage.setItem('selectedRoomType', selectedRoomTypeObject.title);
                }
            }
            if (selectedHotelDetails) {
                const selectedRoomSceneObject = selectedHotelDetails.room_scenic.find(roomScene => roomScene.id === parseInt(selectedRoomScene))
                if (selectedRoomSceneObject) {
                    localStorage.setItem('selectedRoomScene', selectedRoomSceneObject.title)
                }
            }
            localStorage.setItem('selectedHotelDetails', JSON.stringify(selectedHotelDetails))
            localStorage.setItem('selectedPrice', price)
        } else {
            alert("Lütfen tüm alanları doldurun!")
        }
    }


    useEffect(() => {
        const storedRoomType = localStorage.getItem('selectedRoomType');
        const storedRoomScene = localStorage.getItem('selectedRoomScene');

        if (storedRoomType) {
            setSelectedRoomType(storedRoomType);
            console.log("stored room type: ", storedRoomType)
        }

        if (storedRoomScene) {
            setSelectedRoomScene(storedRoomScene);
            console.log("stored room scene: ", storedRoomScene)
        }
    }, [selectedHotelDetails]);

    return (
        <div className="AppSecond">
            <div className='infosSecond' style={{ display: 'flex', marginTop: '10px' }}>
                <div className='preferences'>
                    <div className='preferences-info'>
                        <h3 style={{ color: 'white' }}>Preferences</h3>
                        <div>
                            <strong>Selected Start Date:</strong> <span>{selectedStartDate}</span>
                        </div>
                        <div>
                            <strong>Selected End Date:</strong> <span> {selectedEndDate}</span>
                        </div>
                        <div>
                            <strong>Selected People:</strong> <span> {selectedPeople}</span>
                        </div>
                        <div>
                            <strong>Selected Day Difference:</strong> <span> {selectedDayDifference}</span>
                        </div>
                        <div>
                            <strong>Selected Hotel: </strong> <span>{selectedHotelName}</span>
                        </div>
                    </div>
                </div>

                {selectedHotelDetails && (
                    <div className="main-content">
                        <div className="section">
                            <h3>Selected Hotel Possibilities</h3>
                            <ul className="possibilities-list">
                                {selectedHotelDetails.possibilities.map((possibility, index) => (
                                    <li key={index}>{possibility}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>


            {selectedHotelDetails && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    {selectedHotelDetails.room_type.map((roomType, index) => (
                        <div key={index}
                        onClick={() => handleRoomTypeSelect(roomType.id)}
                            style={{
                                margin: '10px',
                                backgroundColor: selectedRoomType === roomType.id ? '#00FF00' : '#53007D',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                borderColor: selectedRoomType === roomType.id ? 'green' : '#53007D',
                                borderWidth: '12px',
                                borderStyle: 'solid',
                                width: '300px',
                                borderRadius: '5px',
                                padding: '10px',
                                cursor: 'pointer'
                            }}>
                            <div>
                                <strong style={{ color: 'rgba(206, 191, 205, 0.8)' }}>Room Type: </strong>
                                <span style={{ color: 'white' }}>{roomType.title}</span>
                            </div>
                            <div>
                                <strong style={{ color: 'rgba(206, 191, 205, 0.8)' }}>Description: </strong>
                                <span style={{ color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '3em' }}>{roomType.description}</span>
                            </div>
                            <div>
                                <strong style={{ color: 'rgba(206, 191, 205, 0.8)' }}>Price:</strong>
                                <span style={{ color: 'white' }}>{roomType.price}</span>
                            </div>
                            <img src={roomType.photo} style={{ maxWidth: "70%", height: "auto", margin: '20px auto' }} />
                        </div>
                    ))}
                </div>
            )}



            {selectedRoomType && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    {selectedHotelDetails.room_scenic.map((roomScene, index) => {
                        return (
                            <div key={index}
                                onClick={() => handleRoomSceneSelect(roomScene.id)}
                                style={{
                                    margin: '10px',
                                    backgroundColor: selectedRoomScene === roomScene.id ? '#00FF00' : '#53007D',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderColor: selectedRoomScene === roomScene.id ? 'green' : '#53007D',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    width: '300px',
                                    borderRadius: '5px'
                                }}
                            >
                                <div>
                                    <strong style={{ color: 'rgba(206, 191, 205, 0.8)' }}>Room Type: </strong>
                                    <span style={{ color: 'white' }}>{roomScene.title}</span>
                                </div>
                                <div>
                                    <strong style={{ color: 'rgba(206, 191, 205, 0.8)' }}>Price:</strong>
                                    <span style={{ color: 'white' }}>{roomScene.price_rate}</span>
                                </div>
                                <img src={roomScene.photo} style={{ maxWidth: "70%", height: "auto", margin: '20px auto' }} />
                            </div>
                        );

                        return null;
                    })}
                </div>
            )}


            {selectedRoomType && selectedRoomScene && (
                <div style={{
                    backgroundColor: 'white', color: '#53007D', width: '18%', margin: 'auto',
                    height: '30px',
                    fontSize: '20px',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    display: 'flex',
                    fontWeight: 'bold'
                }}>
                    <span>Price: {price}</span>
                </div>
            )}
            <div style={{ display: 'flex' }}>
                <button
                    style={{
                        backgroundColor: canProceed ? '#53007D' : '#ccc',
                        width: '100%',
                        height: '40px',
                        fontSize: '20px',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        marginTop: '10px',
                        marginBottom: '10px',
                        marginRight: '10px',
                        display: 'block'
                    }}
                ><Link to="/" style={{ color: 'white', textDecorationLine: 'none' }}>BACK</Link></button>
                <button
                    style={{
                        backgroundColor: canProceed ? '#53007D' : '#ccc',
                        width: '100%',
                        height: '40px',
                        fontSize: '20px',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        marginTop: '10px',
                        marginBottom: '10px',
                        marginLeft: '10px',
                        display: 'block'

                    }}
                    onClick={handleNext}><Link to={canProceed ? "/third-page" : "/second-page"} style={{ color: 'white', textDecorationLine: 'none' }}>NEXT</Link></button>
            </div>
        </div>
    );
}

export default SecondPage;
