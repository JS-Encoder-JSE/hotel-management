import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useFormik } from "formik";
import { AiOutlineCloseCircle, AiOutlinePlus, AiOutlinePlusSquare } from "react-icons/ai";

const PaymentSection = () => {
    const animatedComponents = makeAnimated();
    const [bankShow, setBankShow] = useState(true);

    const formik = useFormik({
        initialValues: {
            startDate: "",
        },
    });

    const paymentModeList = [
        { value: 'null', label: 'Choose Payment Mode' },
        { value: 'Bank Payment', label: 'Bank Payment' },
        { value: 'SSLCommerz', label: 'SSLCommerz' },
        { value: 'Cash Payment', label: 'Cash Payment' },
        { value: 'Paypal', label: 'Paypal' },
        { value: 'Card Payment', label: 'Card Payment' },
    ]

    const bankList = [
        { value: 'null', label: 'Choose Bank Name' },
        { value: 'Dhaka Bank', label: 'Dhaka Bank' },
        { value: 'Bank Alfarah', label: 'Bank Alfarah' },
        { value: 'Bank AlFalah', label: 'Bank AlFalah' },
        { value: 'Standard Bank', label: 'Standard Bank' },
        { value: 'State Bank', label: 'State Bank' },
        { value: 'DBBL', label: 'DBBL' },
        { value: 'AIBL', label: 'AIBL' },
    ]

    return (
        <section className='grid lg:grid-cols-2 gap-5'>

            {/* Left Side */}
            <div className='bg-white rounded'>
                <h3 className='p-5 text-xl'>Credit</h3>
                <hr />
                <div className='p-5 grid grid-cols-3 gap-5 text-sm font-semibold'>
                    <div className='space-y-5'>
                        <p>Type</p>
                        <p>($) Credit Amt.</p>
                        <p>Remarks</p>
                    </div>
                    <div className='col-span-2 space-y-5'>
                        <div>
                            <select
                                // onChange={handleDiscount}
                                className='border-b outline-none text-xs font-light w-full py-1'
                            >
                                <option value='null'>No Credit</option>
                                <option value="offer">Admin</option>
                                <option value="md Guest">Regular Customer</option>
                            </select>
                        </div>
                        <div>
                            <input type="number" className='w-full outline-none border focus:border-green-slimy rounded mr-1 p-1 text-slate-500' />
                        </div>
                        <div>
                            <textarea type="text" className='border focus:border-green-slimy rounded-md p-2 bg-transparent outline-none w-full'>
                            </textarea>
                        </div>
                    </div>
                </div>

                <h3 className='p-5 text-xl mt-5'>Bill Statement</h3>
                <hr />

                <div className="grid grid-cols-7 gap-2 p-5">
                    <div className="col-span-4 space-y-5">
                        <div className='border-b border-black/20 py-1 mb-5'>Payment Mode</div>
                        <div>
                            <Select
                                components={animatedComponents}
                                options={paymentModeList}
                                placeholder='Choose Payment Mode'
                                className='mt-5 text-xs'
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder='Card Number'
                                className={`w-full outline-none border focus:border-green-slimy rounded mr-1 p-1 text-slate-500`}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 space-y-5">
                        <div className='border-b border-black/20 py-1 mb-5'>Amount</div>
                        <div>
                            <input
                                type="number"
                                placeholder='Amount'
                                className={`w-full outline-none border focus:border-green-slimy rounded mr-1 p-1 text-slate-500`}
                            />
                        </div>
                        <div>
                            {
                                bankShow ?
                                    <Select
                                        components={animatedComponents}
                                        options={bankList}
                                        placeholder='Choose Bank Name'
                                        className='text-xs whitespace-nowrap'
                                    />
                                    :
                                    <input
                                        type="date"
                                        name={`startDate`}
                                        className={`input input-sm input-bordered rounded focus:outline-none w-full mt-1`}
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                    />
                            }
                        </div>
                    </div>
                    <div className="col-span-1 text-center">
                        <div className='border-b border-black/20 py-1 mb-5'>Action</div>
                        <button className='border border-green-slimy hover:bg-green-slimy text-green-slimy hover:text-white duration-300 text-xl p-1 rounded w-fit'>
                            <AiOutlineCloseCircle />
                        </button>
                    </div>
                </div>

                <div className='p-5 flex justify-end'>
                    <button className='border border-green-slimy hover:bg-green-slimy text-3xl text-green-slimy hover:text-white duration-300 rounded'>
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>

            {/* Right Side */}
            <div className='bg-white rounded'>
                <h3 className='p-5 text-xl'>Special Discount</h3>
                <hr />
                <div className='p-5 grid grid-cols-3 gap-5 text-sm font-semibold'>
                    <div className='space-y-5'>
                        <p>Type</p>
                        <p>($) Credit Amt.</p>
                        <p>Remarks</p>
                    </div>
                    <div className='col-span-2 space-y-5'>
                        <div>
                            <select
                                // onChange={handleDiscount}
                                className='border-b outline-none text-xs font-light w-full py-1'
                            >
                                <option value='null'>No Credit</option>
                                <option value="offer">Admin</option>
                                <option value="md Guest">Regular Customer</option>
                            </select>
                        </div>
                        <div>
                            <input type="number" className='w-full outline-none border focus:border-green-slimy rounded mr-1 p-1 text-slate-500' />
                        </div>
                        <div>
                            <textarea type="text" className='border focus:border-green-slimy rounded-md p-2 bg-transparent outline-none w-full'>
                            </textarea>
                        </div>
                    </div>
                </div>

                <h3 className='p-5 text-xl mt-5'>Balance Details</h3>
                <hr />

                <div className='p-5 grid grid-cols-3 items-center text-sm font-semibold'>
                    <div className='space-y-3'>
                        <p>Remain Amt.</p>
                        <p>Collected Amt.</p>
                        <p>Change Amt.</p>
                    </div>
                    <div className='col-span-2 space-y-3'>
                        <p>$5646.00</p>
                        <p>$0</p>
                        <p>$0</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentSection;