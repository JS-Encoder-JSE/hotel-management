import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const CheckOut = () => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const animatedComponents = makeAnimated();

    const roomList = [
        // { value: '', label: 'Room Select' },
        { value: '1', label: '1 - Chocolate' },
        { value: '2', label: '2 - Strawberry' },
        { value: '3', label: '3 - Vanilla' },
        { value: '4', label: '4 - Vanilla' },
        { value: '5', label: '5 - Vanilla' },
        { value: '6', label: '6 - Vanilla' },
        { value: '7', label: '7 - Vanilla' },
        { value: '8', label: '8 - Vanilla' },
        { value: '9', label: '9 - Vanilla' },
        { value: '10', label: '10 - Vanilla' },
        { value: '11', label: '11 - Vanilla' },
        { value: '12', label: '12 - Vanilla' },
    ]

    const handleSearchRoom = (e) => {
        const rooms = e.map(i => i.value);
        setSelectedRooms(rooms);
    }

    return (
        <div className='space-y-5'>
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
                    />
                </div>
                <button
                    className=" btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case p-4 h-auto"
                >
                    Go
                </button>
            </section>

            {/* Customer Info and Set them to default */}
            {selectedRooms.length > 0 &&
                <section className='grid lg:grid-cols-2 gap-5'>

                    {/* Left Side */}
                    <div className='bg-white'>
                        <h3 className='p-5 text-xl'>Customer Details</h3>
                        <hr />
                        <div className='p-5 grid grid-cols-3 items-center text-sm font-semibold'>
                            <di className='flex flex-col gap-3'>
                                <p>Name</p>
                                <p>Room No..</p>
                                <p>Email ID</p>
                                <p>Mobile No</p>
                                <p>Address</p>
                                <p>Time Format</p>
                                <p>Booking Time</p>
                                <p>Booking Source</p>
                            </di>
                            <div className='col-span-2 flex flex-col gap-3'>
                                <p>Tajkir _ Rion</p>
                                <p>108</p>
                                <p>dev.tajkir@gmail.com</p>
                                <p>0123456789101</p>
                                <p>Banglamotor, Dhaka</p>
                                <p>24 hrs</p>
                                <input
                                    type="text"
                                    disabled
                                    placeholder='Instant'
                                    className='pl-5 bg-transparent border-b focus:border-green-slimy cursor-not-allowed'
                                />
                                <input
                                    type="text"
                                    disabled
                                    placeholder='JS Encoder'
                                    className='pl-5 bg-transparent border-b focus:border-green-slimy cursor-not-allowed'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className='bg-white'>
                        <h3 className='p-5 text-xl'>Set Default Customer</h3>
                        <hr />
                        <div className='p-5'>
                            {
                                [...Array(selectedRooms.length)].map((_, index) =>
                                    <div className='border p-3 rounded-md flex gap-3 items-center mb-4'>
                                        <React.Fragment key={index}>
                                            <input type="radio" name="radio-default-customer" className="radio radio-primary" />
                                            <div>
                                                <p className='text-sm opacity-80'>
                                                    2{index + 1} - 00012{index}
                                                </p>
                                                <p>
                                                    2023-02-24 12:00:00 - 2023-02-25 11:00:00
                                                </p>
                                            </div>
                                        </React.Fragment>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            }
        </div>
    );
};

export default CheckOut;