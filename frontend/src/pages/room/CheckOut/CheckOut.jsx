import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CustomerInfoSection from './CustomerInfoSection';
import RoomDetailsSection from './RoomDetailsSection';
import BillingSection from './BillingSection';
import PaymentSection from './PaymentSection';

const CheckOut = () => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [showRooms, setShowRooms] = useState(false);
    const animatedComponents = makeAnimated();

    // This portion will come from api. and After fetching api needs a state [roomList, setRoomList]
    const roomList = [
        // { value: '', label: 'Room Select' },
        { value: '1 - Chocolate', label: '1 - Chocolate' },
        { value: '2 - Strawberry', label: '2 - Strawberry' },
        { value: '3 - Shake', label: '3 - Shake' },
        { value: '4 - AC', label: '4 - AC' },
        { value: '5 - None AC', label: '5 - None AC' },
        { value: '6 - Fan', label: '6 - Fan' },
        { value: '7 - Deluxe', label: '7 - Deluxe' },
        { value: '8 - None-Deluxe', label: '8 - None-Deluxe' },
        { value: '9 - Couple', label: '9 - Couple' },
        { value: '10 - Anniversary', label: '10 - Anniversary' },
        { value: '11 - Official', label: '11 - Official' },
        { value: '12 - VIP', label: '12 - VIP' },
    ]

    const handleSearchRoom = e => {
        const rooms = e.map(i => i.value);
        setSelectedRooms(rooms);
    }

    const handleGetRooms = () => {
        setShowRooms(true)
    }
    
  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

    return (
        <div className='space-y-8'>
            {/* Select Room Section */}
            <section className='max-w-3xl mx-auto flex gap-5 items-center'>
                <p>Room No. :</p>
                <div className='w-[353px]'>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={roomList}
                        placeholder='Room Select'
                        onChange={(e) => handleSearchRoom(e)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button
                    onClick={handleGetRooms}
                    disabled={selectedRooms.length === 0}
                    className=" btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case p-4 h-auto"
                >
                    Go
                </button>
            </section>

            {/* Customer Info and Set them to default */}
            {showRooms &&
                <>
                    <CustomerInfoSection selectedRooms={selectedRooms} />
                    <RoomDetailsSection selectedRooms={selectedRooms} />
                    <BillingSection />
                    <PaymentSection />
                </>
            }
        </div>
    );
};

export default CheckOut;