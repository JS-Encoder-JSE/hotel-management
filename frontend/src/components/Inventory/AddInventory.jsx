import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
    itemName: yup.string().required("Category is required"),
    itemDescription: yup.string().required("Type is required"),
    ItemQuantity: yup.string().required("Floor number is required"),
});

const AddInventory = () => {
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
            itemDescription: "",
            ItemQuantity: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className={`space-y-10`}>
            <h3
                className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
            >
                <FaPlusCircle />
                <span>Add Items</span>
            </h3>
            <form
                className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
                onSubmit={formik.handleSubmit}
            >
                {/* Item Name */}
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Item Name"
                        name="itemName"
                        className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
                        value={formik.values.itemName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.itemName && Boolean(formik.errors.itemName) ? (
                        <small className="text-red-600">
                            {formik.touched.itemName && formik.errors.itemName}
                        </small>
                    ) : null}
                </div>
                {/* Item Quantity */}
                <div className="flex flex-col gap-3">
                    <input
                        type="number"
                        placeholder="Item Quantity"
                        name="ItemQuantity"
                        className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
                        value={formik.values.ItemQuantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.ItemQuantity && Boolean(formik.errors.ItemQuantity) ? (
                        <small className="text-red-600">
                            {formik.touched.ItemQuantity && formik.errors.ItemQuantity}
                        </small>
                    ) : null}
                </div>
                <div className="col-span-2 flex flex-col gap-3">
                    <textarea
                        placeholder="Item Description"
                        name="itemDescription"
                        className="textarea textarea-sm textarea-bordered resize-none border-green-slimy rounded w-full focus:outline-none"
                        value={formik.values.itemDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.itemDescription && Boolean(formik.errors.itemDescription) ? (
                        <small className="text-red-600">
                            {formik.touched.itemDescription && formik.errors.itemDescription}
                        </small>
                    ) : null}
                </div>
                {/* submit button */}
                <button
                    type="submit"
                    className="col-span-full btn btn-sm w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                >
                    Add
                </button>
            </form>
        </div >
    );
};

export default AddInventory;