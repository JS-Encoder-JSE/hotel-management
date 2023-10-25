import React from 'react';
import { FaCalendarDay } from 'react-icons/fa'

const UserDashBoard = () => {
    return (
        <div>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='relative bg-white p-3 pb-20 text-right shadow rounded'>
                    <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#f67709] to-[#fe9302] p-3 rounded-md">
                        <FaCalendarDay />
                    </div>
                    <h6 className='text-xs text-slate-400'>TODAY BOOKING</h6>
                    <p className='text-xl font-semibold mt-1 mb-5'>0</p>
                    <hr />
                </div>
                <div className='relative bg-white p-3 pb-20 text-right shadow rounded'>
                    <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#f67709] to-[#fe9302] p-3 rounded-md">
                        <FaCalendarDay />
                    </div>
                    <h6 className='text-xs text-slate-400'>TODAY BOOKING</h6>
                    <p className='text-xl font-semibold mt-1 mb-5'>0</p>
                    <hr />
                </div>
                <div className='relative bg-white p-3 pb-20 text-right shadow rounded'>
                    <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#f67709] to-[#fe9302] p-3 rounded-md">
                        <FaCalendarDay />
                    </div>
                    <h6 className='text-xs text-slate-400'>TODAY BOOKING</h6>
                    <p className='text-xl font-semibold mt-1 mb-5'>0</p>
                    <hr />
                </div>
                <div className='relative bg-white p-3 pb-20 text-right shadow rounded'>
                    <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#f67709] to-[#fe9302] p-3 rounded-md">
                        <FaCalendarDay />
                    </div>
                    <h6 className='text-xs text-slate-400'>TODAY BOOKING</h6>
                    <p className='text-xl font-semibold mt-1 mb-5'>0</p>
                    <hr />
                </div>
            </section>
        </div>
    );
};

export default UserDashBoard;