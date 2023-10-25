import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ConfirmOrder = () => {
    const [foods, setFoods] = useState([
        { name: 'Rice', quantity: 1, price: 104, totalPrice: 104 },
        { name: 'Chicken', quantity: 1, price: 134, totalPrice: 134 },
        { name: 'Burger', quantity: 1, price: 454, totalPrice: 454 },
        { name: 'Sandwich', quantity: 1, price: 504, totalPrice: 504 },
    ]);

    // Getting the total sum of total price.
    const totalSumOfPrice = foods.reduce((sum, foodPrice) => sum + foodPrice.totalPrice, 0);

    const formik = useFormik({
        initialValues: {
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleIncrease = (index) => {
        const updatedItems = [...foods];
        updatedItems[index].quantity = parseInt(updatedItems[index].quantity) + 1;
        updatedItems[index].totalPrice = parseInt(updatedItems[index].totalPrice) + parseInt(updatedItems[index].price);
        setFoods(updatedItems);
    };

    const handleDecrease = (index) => {
        if (foods[index].quantity > 1) {
            const updatedItems = [...foods];
            updatedItems[index].quantity -= 1;
            updatedItems[index].totalPrice = parseInt(updatedItems[index].totalPrice) - parseInt(updatedItems[index].price);
            setFoods(updatedItems);
        }
    };

    const handleQuantity = (e, index) => {
        let value = e.target.value ? e.target.value : 1;
        const updatedItems = [...foods];
        const parsedValue = parseInt(value);

        if (!isNaN(parsedValue) && value >= 1) {
            updatedItems[index].quantity = parsedValue;
            updatedItems[index].totalPrice = parseInt(updatedItems[index].price) * parsedValue;
            setFoods(updatedItems);
        } else {
            updatedItems[index].quantity = 1;
            setFoods(updatedItems);
        }
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
                                                        className='input-hide_Arrows w-12 flex outline-none text-center rounded-md p-1 placeholder:text-black border focus:border-green-slimy'
                                                    />
                                                    <button
                                                        onClick={() => handleIncrease(index)}
                                                        type='btn'
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </td>
                                                <td>
                                                    {item.totalPrice}
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                <tfoot className={`text-sm`}>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="mt-3">
                                                <h2 className="card-title underline my-4">Proceed To Checkout</h2>
                                                <div className="pl-2 mb-4 w-[70%] text-md font-semibold">
                                                    <p className='flex justify-between'>Total Price : <span>${totalSumOfPrice}</span></p>
                                                    <p className='flex justify-between'>Tax : <span>$20</span></p>
                                                    <p className='flex justify-between'>Grand Total: <span>${totalSumOfPrice + 20}</span></p>
                                                </div>
                                                <div className='flex justify-end'>
                                                    <button className='p-2 bg-green-slimy hover:bg-[#64bece] text-xl text-white duration-300 rounded-lg'>
                                                        Place Order
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
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