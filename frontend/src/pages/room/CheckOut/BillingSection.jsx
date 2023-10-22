import React from 'react';

const BillingSection = () => {
    return (
        <section className='grid lg:grid-cols-3 gap-5'>
            <div className='bg-white rounded'>
                <h3 className='p-5 text-xl'>Billing Details</h3>
                <hr />
                {/* <div className='p-5 grid grid-cols-3 gap-2 text-sm font-semibold'>
                    <div className="col-span-2 space-y-3">
                        <p>Room Rent Amt.</p>
                        <p>Discount (Max-100%)</p>
                        <div>
                            <input type="number" className='outline-none border rounded mr-1' /> 
                            <span>(%) (or)</span>
                        </div>
                        <div>
                            <input type="number" className='outline-none border rounded mr-1' /> 
                            <span>(Amount)</span>
                        </div>
                        <p>Discount Amt.</p>
                        <p>Service Charge Amt.</p>
                        <p>Total Room Rent Amt.</p>
                        <p>Total Room Rent Amt. With Tax</p>
                        <p>Complementary Amt.</p>
                        <p>Ex. Bed/Per./Ch. Amt.</p>
                        <p>Advance Amt.</p>
                        <p>Payable Rent Amt.</p>
                    </div>
                    <div className='space-y-3'>
                        <p>$10000</p>
                        <select className='border-b outline-none text-xs font-light'>
                            <option selected>No Discount</option>
                            <option value="offer">Offer</option>
                            <option value="reduction">Reduction</option>
                            <option value="md Guest">MD Guest</option>
                        </select>
                        <p>$0</p>
                        <p>$700</p>
                        <p>$10700</p>
                        <p>$12150</p>
                        <p>$0</p>
                        <p>$0</p>
                        <p>$0</p>
                        <p>$12150</p>
                    </div>
                </div> */}

                <table className='text-sm font-semibold m-5'>
                    <tr>
                        <td>Room Rent Amt.</td>
                        <td className='align-top pl-2 pb-2'>$100000</td>
                    </tr>
                    <tr>
                        <td>
                            <span>Discount (Max-100%)</span>
                            <div className='grid grid-cols-2'>
                                <input type="number" className='outline-none border rounded mr-1 pl-2 text-slate-500' />
                                <span>(%) (or)</span>
                            </div>
                            <div className='grid grid-cols-2'>
                                <input type="number" className='outline-none border rounded mr-1 pl-2 text-slate-500' />
                                <span>(Amount)</span>
                            </div>
                        </td>
                        <td className='align-top pl-2 pb-2'>
                            <select className='border-b outline-none text-xs font-light'>
                                <option selected>No Discount</option>
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
                </table>
            </div>
        </section>
    );
};

export default BillingSection;