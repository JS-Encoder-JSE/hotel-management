import React from 'react';

const RoomDetailsSection = () => {
    return (
        <section className='bg-white p-5 rounded'>
            {/* <div className='grid grid-cols-5 overflow-x-auto bg-base-200'>
                <div className='border border-slate-300 p-2'>
                    Room No.
                </div>



                <div className='border border-slate-300 p-2'>
                    Date
                </div>



                <div className='col-span-3 border border-slate-300 p-2 text-center'>
                    Room Rent List
                </div>
            </div> */}


            <table className='w-full border border-black/30'>
                <thead className='bg-[#e5e7eb] border border-black/30'>
                    <tr className='grid grid-cols-5 items-center text-left'>
                        <th className='py-1 px-3 text-black text-sm font-medium border-r border-black/30'>Room No.</th>
                        <th className='py-1 px-3 text-black text-sm font-medium border-r border-black/30'>Date</th>
                        <th className='col-span-3 text-center text-black text-sm font-medium'>Room Rent List</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='grid grid-cols-5 items-center text-left'>
                        <td className='py-1 px-3 border-r border-black/30'>
                            <p className='font-semibold'>101</p>
                            <p className='text-xs text-slate-500 font-light'>VIP Guest</p>
                        </td>

                        <td className='py-1 px-3 border-r border-black/30'>
                            <p className='font-semibold'>101</p>
                            <p className='text-xs text-slate-500 font-light'>VIP Guest</p>
                        </td>

                        <td className='col-span-3 py-1 px-3 border-r border-black/30'>
                            <p className='font-semibold'>101</p>
                            <p className='text-xs text-slate-500 font-light'>VIP Guest</p>
                        </td>
                    </tr>
                </tbody>
            </table>


        </section>
    );
};

export default RoomDetailsSection;