import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle, FaUpload } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
    category: yup.string().required("Category is required"),
    price: yup.string().required("Price is required"),
});

const InventoryManagement = () => {
    const formik = useFormik({
        initialValues: {
            category: "",
            price: "",
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
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                <td>Bed Sheet</td>
                                <td>1</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                <td>Pillow</td>
                                <td>2</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                <td>Cutlery</td>
                                <td>3</td>
                            </tr>
                            {/* row 4 */}
                            <tr>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                <td>Cookware</td>
                                <td>5</td>
                            </tr>
                            {/* row 5 */}
                            <tr>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                <td>Soap</td>
                                <td>8</td>
                            </tr>
                            {/* row 6 */}
                            <tr>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                <td>Tissue</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </div >







                {/* submit button */}
                <button button
                    type="submit"
                    className="col-span-full btn btn-sm w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                >
                    Add
                </button >
            </form >
        </div >
    );
};

export default InventoryManagement;