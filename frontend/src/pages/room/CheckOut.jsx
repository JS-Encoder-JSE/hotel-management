import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const CheckOut = () => {
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
        console.log(e.map(i => i.value));
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
            <section className='grid lg:grid-cols-2 gap-5'>
                <div className='bg-white'>
                    <h3 className='p-5 text-xl'>Customer Details</h3>
                    <hr />
                    <div className='p-5 grid grid-cols-3 items-center'>
                        <di className='flex flex-col gap-2'>
                            <p>Name</p>
                            <p>Room No..</p>
                            <p>Email ID</p>
                            <p>Mobile No</p>
                            <p>Address</p>
                            <p>Time Format</p>
                            <p>Booking Time</p>
                            <p>Booking Source</p>
                        </di>
                        <div className='col-span-2 flex flex-col gap-2'>
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











                <div className='bg-white p-5'>
                    dfs
                </div>
            </section>
        </div>
    );
};

export default CheckOut;