import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
    itemName: yup.string(),
    price: yup.string().required("Price is required"),
});

const InventoryManagement = () => {
    const [items, setItems] = useState([
        { name: 'Bed Sheet', quantity: 0, active: false },
        { name: 'Pillow', quantity: 0, active: false },
        { name: 'Cutlery', quantity: 0, active: false },
        { name: 'Cookware', quantity: 0, active: false },
        { name: 'Soap', quantity: 0, active: false },
        { name: 'Tissue', quantity: 0, active: false },
    ]);


    const formik = useFormik({
        initialValues: {
            itemName: "",
            price: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });


    const handleSelectItem = (index) => {
        const selectItem = [...items];
        selectItem[index].active = !selectItem[index].active;
        if (selectItem[index].active === false) {
            setItems(selectItem[index].quantity = 0)
        }
        setItems(selectItem)
    }

    const handleIncrease = (index) => {
        const updatedItems = [...items];
        updatedItems[index].quantity += 1;
        setItems(updatedItems);
    };

    const handleDecrease = (index) => {
        if (items[index].quantity > 0) {
            const updatedItems = [...items];
            updatedItems[index].quantity -= 1;
            setItems(updatedItems);
        }
    };


    return (
        <div className={`space-y-10`}>
            <h3
                className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
            >
                <FaPlusCircle />
                <span>Add Items</span>
            </h3>
            <form
                className="form-control max-w-3xl mx-auto"
                onSubmit={formik.handleSubmit}
            >
                {/* category box */}
                {/* <div className="flex flex-col gap-3">
                    <select
                        name="category"
                        className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="" selected disabled>
                            Category
                        </option>
                        <option value="general">General</option>
                        <option value="deluxe">Deluxe</option>
                    </select>
                    {formik.touched.category && Boolean(formik.errors.category) ? (
                        <small className="text-red-600">
                            {formik.touched.category && formik.errors.category}
                        </small>
                    ) : null}
                </div> */}

                {/* price box */}
                {/* <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && Boolean(formik.errors.price) ? (
                        <small className="text-red-600">
                            {formik.touched.price && formik.errors.price}
                        </small>
                    ) : null}
                </div> */}





                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='grid grid-cols-5 items-center'>
                                <th>Select</th>
                                <th className='col-span-3'>Name</th>
                                <th className='col-span-1'>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="grid grid-cols-5 items-center">
                                    <td>
                                        <label className="ml-5">
                                            <input type="checkbox" onChange={() => handleSelectItem(index)} className="checkbox" />
                                        </label>
                                    </td>
                                    <td className="col-span-3">
                                        {item.name}
                                    </td>
                                    <td className="col-span-1 flex items-center gap-4 text-lg">
                                        <button
                                            onClick={() => handleDecrease(index)}
                                            type='btn'
                                            disabled={item.quantity === 0}
                                            className={item.quantity === 0 ? 'opacity-50' : null}
                                        >
                                            <FaMinusCircle />
                                        </button>
                                        {item.quantity}
                                        <button
                                            onClick={() => handleIncrease(index)}
                                            type='btn'
                                            disabled={item.active === false}
                                            className={item.active === false ? 'opacity-50' : null}
                                        >
                                            <FaPlusCircle />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >


                {/* submit button */}
                <button
                    type="submit"
                    className="col-span-full btn btn-sm w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                >
                    Add
                </button>
            </form >
        </div >
    );
};

export default InventoryManagement;