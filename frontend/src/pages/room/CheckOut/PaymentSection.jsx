import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useFormik } from "formik";

const PaymentSection = () => {
    const animatedComponents = makeAnimated();

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
                <div className="grid grid-cols-5 p-5">
                    <div className="col-span-2">
                        <div>dfsd</div>
                        <div>dfsd</div>
                        <div>dfsd</div>
                    </div>
                    <div className="col-span-2">
                        <div>dfsd</div>
                        <div>dfsd</div>
                        <div>dfsd</div>
                    </div>
                    <div className="col-span-1">
                        <div>dsfsd</div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            {/* <div className='bg-white rounded'>
                <h3 className='p-5 text-xl'>Set Default Customer</h3>
                <hr />
                <div className='p-5'>
                    {
                        [...Array(2)].map((_, index) =>
                            <div key={index} className='border p-3 rounded-md flex gap-3 items-center mb-4'>
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
            </div> */}
        </section>
    );
};

export default PaymentSection;



{/* <Select
    components={animatedComponents}
    options={paymentModeList}
    placeholder='Choose Payment Mode'
    className='mt-5 text-xs'
/> */}

{/* <input type="text" placeholder="Card Number" className='w-full py-1 outline-none border focus:border-green-slimy rounded mr-1 pl-2 text-slate-500' />
<input
    type="date"
    name={`startDate`}
    className={`input input-sm input-bordered rounded focus:outline-none w-full`}
    value={formik.values.startDate}
    onChange={formik.handleChange}
/> */}