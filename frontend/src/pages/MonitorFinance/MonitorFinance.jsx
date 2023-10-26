import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import UserDashBoard from '../../components/UserDashBoard/UserDashBoard';



const MonitorFinance = () => {
    const animatedComponents = makeAnimated();
     
    // This portion will come from api. and After fetching api needs a state [roomList, setRoomList]
     const hotelList = [
        // { value: '', label: 'Room Select' },
        { value: 'Hotel - 1', label: '1 - Chocolate' },
        { value: 'Hotel - 2', label: '2 - Strawberry' },
        { value: 'Hotel - 3', label: '3 - Shake' },
        { value: 'Hotel - 4', label: '4 - AC' },
        { value: 'Hotel - 5', label: '5 - None AC' },
        { value: 'Hotel - 6', label: '6 - Fan' },
        { value: 'Hotel - 7', label: '7 - Deluxe' },
        { value: 'Hotel - 8', label: '8 - None-Deluxe' },
        { value: 'Hotel - 9', label: '9 - Couple' },
        { value: 'Hotel - 10', label: '10 - Anniversary' },
        { value: 'Hotel - 11', label: '11 - Official' },
        { value: 'Hotel - 12', label: '12 - VIP' },
    ]

    const handleSearchHotel = e => {
        console.log(e.value);
    }

    return (
        <div className='space-y-20'>
            {/* Select Room Section */}
            <section className='max-w-3xl mx-auto flex gap-5 items-center'>
                <p className='whitespace-nowrap'>Hotel Name :</p>
                <div className='w-[353px]'>
                    <Select
                        components={animatedComponents}
                        options={hotelList}
                        placeholder='Search with hotel name'
                        onChange={(e) => handleSearchHotel(e)}
                    />
                </div>
            </section>

            <section>
                <UserDashBoard></UserDashBoard>
            </section>

        </div>
    );
};

export default MonitorFinance;