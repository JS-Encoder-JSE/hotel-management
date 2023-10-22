import React, { useState } from 'react';
import { AiFillPrinter } from "react-icons/ai";

const BillingSection = () => {
    const [discount, setDiscount] = useState(true);

    const handleDiscount = (e) => {
        let value = e.target.value;
        console.log(value);

        if (value == 'null') {
            setDiscount(true);
        }
        setDiscount(false);
    }

    // Problem to getting the value of discount if it set to true from the if else condition (handleDiscount())
    console.log(discount);

    return (
        <section className='grid lg:grid-cols-3 gap-5'>
            <div className='bg-white rounded'>
                <h3 className='p-5 text-xl'>Billing Details</h3>
                <hr />

                <table className='text-sm font-semibold m-5'>
                    <tbody>
                        <tr>
                            <td>Room Rent Amt.</td>
                            <td className='align-top pl-2 pb-2'>$100000</td>
                        </tr>
                        <tr>
                            <td>
                                <span>Discount (Max-100%)</span>
                                <div className='grid grid-cols-2'>
                                    <input
                                        disabled={discount}
                                        type="number"
                                        className={`outline-none border rounded mr-1 pl-2 text-slate-500 ${discount && 'cursor-not-allowed'}`}
                                    />
                                    <span>(%) (or)</span>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <input
                                        disabled={discount}
                                        type="number"
                                        className={`outline-none border rounded mr-1 pl-2 text-slate-500 ${discount && 'cursor-not-allowed'}`}
                                    />
                                    <span>(Amount)</span>
                                </div>
                            </td>
                            <td className='align-top pl-2 pb-2'>
                                <select
                                    onChange={handleDiscount}
                                    className='border-b outline-none text-xs font-light'
                                >
                                    <option value='null'>No Discount</option>
                                    <option value="offer">Offer</option>
                                    <option value="reduction">Reduction</option>
                                    <option value="md Guest">MD Guest</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Discount Amt.</td>
                            <td className='align-top pl-2 pb-2'>$0</td>
                        </tr>
                        <tr>
                            <td>Service Charge Amt.</td>
                            <td className='align-top pl-2 pb-2'>$700</td>
                        </tr>
                        <tr>
                            <td>Total Room Rent Amt.</td>
                            <td className='align-top pl-2 pb-2'>$100000</td>
                        </tr>
                        <tr>
                            <td>Total Room Rent Amt. With Tax</td>
                            <td className='align-top pl-2 pb-2'>$12150.00</td>
                        </tr>
                        <tr>
                            <td>Complementary Amt.</td>
                            <td className='align-top pl-2 pb-2'>$0</td>
                        </tr>
                        <tr>
                            <td>Ex. Bed/Per./Ch. Amt.</td>
                            <td className='align-top pl-2 pb-2'>$12150</td>
                        </tr>
                        <tr>
                            <td>Advance Amt.</td>
                            <td className='align-top pl-2 pb-2'>$0</td>
                        </tr>
                        <tr>
                            <td>Payable Rent Amt.</td>
                            <td className='align-top pl-2 pb-2'>$12150.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='bg-white rounded'>
                <h3 className='p-5 text-xl'>Additional Charges</h3>
                <hr />
                <table className='text-sm font-semibold m-5'>
                    <tbody className='flex flex-col gap-3'>
                        <tr>
                            <td className='whitespace-nowrap'>Additional Charges</td>
                            <td className='pl-5'>
                                <input type="number" className='border rounded-md p-2 outline-none w-full w-[85%]' />
                            </td>
                        </tr>
                        <tr>
                            <td className='align-top'>Additional Charges Comments</td>
                            <td className='pl-5'>
                                <textarea type="text" className='border rounded-md p-2 bg-transparent outline-none w-[85%]'>
                                    </textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                   <h3 className='p-5 text-xl mt-8'>Payment Details</h3>
                <hr />
                <table className='text-sm font-semibold m-5'>
                    <tbody className='flex flex-col gap-3'>
                        <tr>
                            <td>
                                Net Payable Amt
                                </td>
                            <td>
                                $12150
                            </td>
                        </tr>
                        <tr>
                            <td>
                            Credit Amt.
                            </td>
                            <td>
                                $0.00
                            </td>
                        </tr>
                        <tr>
                            <td>
                            Special Discount Amt
                            </td>
                            <td>
                                $0.00
                            </td>
                        </tr>
                        <tr>
                            <td>
                            Payable Amt.
                            </td>
                            <td>
                            $12321.675
                            </td>
                        </tr>
                        </tbody>
                        </table>
            </div>

            
            <div className='bg-white rounded'>
                <h3 className='p-5 text-xl'>Room Posted Bill</h3>
                <hr />
                <table className='text-sm font-semibold m-5'>
                    <thead>
                    <tr className='text-md'>
                            <td>
                                Bill Type
                                </td>
                            <td>
                            ($)Total
                            </td>
                            <td>
                            Action
                            </td>
                        </tr>
                    </thead>
                    <tbody className='flex flex-col gap-3'>
                        <tr className='text-md'>
                            <td>
                               Swimming Pool
                                </td>
                            <td>
                            0
                            </td>
                        </tr>
                        <tr className='text-md'>
                            <td>
                               Restaurant
                                </td>
                            <td>
                            171.675	
                            </td>
                            <td>
                                <button className='bg-green-slimy hover:bg-green-slimy/70 text-white text-xl p-1 rounded'>
                                <AiFillPrinter />
                                </button>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
        </section>
    );
};

export default BillingSection;