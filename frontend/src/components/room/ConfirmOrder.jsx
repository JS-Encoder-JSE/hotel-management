import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FaFileInvoice, FaMinus, FaPlus } from 'react-icons/fa';

const ConfirmOrder = () => {
    const [foods, setFoods] = useState([
        { name: 'Rice', quantity: 1, price: 104 },
        { name: 'Chicken', quantity: 1, price: 134 },
        { name: 'Burger', quantity: 1, price: 454 },
        { name: 'Sandwich', quantity: 1, price: 504 },
    ]);

    const formik = useFormik({
        initialValues: {
            // roomNumber: "",
            // name: "",
            // age: "",
            // adult: "",
            // children: "",
            // paymentMethod: "",
            // cardNumber: "",
            // mobileBankingNo: "",
            // trxID: "",
            // discount: "",
        },
        // validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleIncrease = (index) => {
        const updatedItems = [...foods];
        updatedItems[index].quantity = parseInt(updatedItems[index].quantity) + 1;
        setFoods(updatedItems);
        console.log(typeof (updatedItems[index].quantity));
    };

    const handleDecrease = (index) => {
        if (foods[index].quantity > 1) {
            const updatedItems = [...foods];
            updatedItems[index].quantity -= 1;
            setFoods(updatedItems);
        }
    };

    const handleQuantity = (e, index) => {
        const value = e.target.value ? e.target.value : 1;
        const updatedItems = [...items];

        if (!isNaN(value) && value >= 1) {
            updatedItems[index].quantity = value;
        } else {
            updatedItems[index].quantity = 1;
        }
        setFoods(updatedItems);
    }

    return (
        <>
            <form method="dialog">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => formik.handleReset()}
                >
                    ✕
                </button>
            </form>

            <div className='space-y-10 my-5'>
                <div className={`bg-white px-10 py-5 rounded `}>
                    <h3 className={`text-xl font-semibold`}>Confirm Order</h3>
                    <hr className={`my-5`} />
                    <div className={`space-y-10`}>
                        <div className="overflow-x-auto w-full">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        foods.map((item, index) =>
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td className='flex gap-1'>
                                                    <button
                                                        onClick={() => handleDecrease(index)}
                                                        type='btn'
                                                        disabled={item.quantity === 1}
                                                        className={item.quantity === 1 ? 'opacity-50' : null}
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <input
                                                        type='number'
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantity(e, index)}
                                                        className='input-hide_Arrows w-12 flex outline-none text-center rounded-md p-1 border focus:border-green-slimy'
                                                    />
                                                    <button
                                                        onClick={() => handleIncrease(index)}
                                                        type='btn'
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </td>
                                                <td>
                                                    120
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                <tfoot className={`text-sm`}>
                                    <tr>
                                        <td colSpan={5} className={`text-end`}><div className="card  bg-white-300 shadow-xl">
                                            <div className="card-body text-center max-auto">
                                                <h2 className="card-title underline">Cart </h2>
                                                <p>Total Price : $120</p>
                                                <p>Tax : $20</p>
                                                <p>Grand Total: $140</p>
                                                <div>
                                                    <button className="btn bg-green-400">Clear cart</button>
                                                    <button className="btn bg-green-400">CheckOut</button>
                                                </div>
                                            </div>
                                        </div></td>
                                        <td></td>

                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;