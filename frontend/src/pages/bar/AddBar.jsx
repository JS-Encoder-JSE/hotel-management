import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle } from "react-icons/fa";
import { useAddInventoryMutation } from "../../redux/inventory/inventoryAPI.js";
import toast from "react-hot-toast";

// form validation
const validationSchema = yup.object({
  brandName: yup.string().required("Brand Name is required"),
  itemDescription: yup
    .string()
    .required("Description is required")
    .min(20, "Description at least 20 characters length"),
    surveyorQuantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer"),
    ItemPrice: yup.string().required("Price is required"),
    typeOfAlcohol: yup.string().required("Type Of Alcohol is required"),
});

const AddBar = () => {
  const formik = useFormik({
    initialValues: {
      brandName: "",
      typeOfAlcohol: "",
      itemDescription: "",
      surveyorQuantity: "",
      ItemPrice: "",
     
    },
    validationSchema,
    onSubmit: (values) => {
        console.log(values);
      },
  });

  return (
    <div className={`space-y-10 bg-white p-10 rounded-2xl`}>
      <h3
        className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
      >
        <FaPlusCircle />
        <span>Add Item Bar</span>
      </h3>
      <form
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        {/* Brand Name */}
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Brand Name"
            name="brandName"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.brandName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.brandName && Boolean(formik.errors.brandName) ? (
            <small className="text-red-600">
              {formik.touched.brandName && formik.errors.brandName}
            </small>
          ) : null}
        </div>

        {/* Type Of Alcohol Pack */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Type Of Alcohol"
            name="typeOfAlcohol"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.typeOfAlcohol}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.typeOfAlcohol &&
          Boolean(formik.errors.typeOfAlcohol) ? (
            <small className="text-red-600">
              {formik.touched.typeOfAlcohol && formik.errors.typeOfAlcohol}
            </small>
          ) : null}
        </div>
        {/* Item Quantity */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="surveyor Quantity"
            name="surveyorQuantity"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.surveyorQuantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.surveyorQuantity &&
          Boolean(formik.errors.surveyorQuantity) ? (
            <small className="text-red-600">
              {formik.touched.surveyorQuantity && formik.errors.surveyorQuantity}
            </small>
          ) : null}
        </div>
        {/* Item Price */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Item Price"
            name="ItemPrice"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.ItemPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ItemPrice &&
          Boolean(formik.errors.ItemPrice) ? (
            <small className="text-red-600">
              {formik.touched.ItemPrice && formik.errors.ItemPrice}
            </small>
          ) : null}
        </div>
        
        {/* item Description */}
        <div className="col-span-full flex flex-col gap-3">
          <textarea
            placeholder="Item Description"
            name="itemDescription"
            className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
            value={formik.values.itemDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.itemDescription &&
          Boolean(formik.errors.itemDescription) ? (
            <small className="text-red-600">
              {formik.touched.itemDescription && formik.errors.itemDescription}
            </small>
          ) : null}
        </div>
        {/* submit button */}
        <div className=" col-span-full text-end mt-5 ">
          <button
            type="submit"
            className=" btn btn-md  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBar;
