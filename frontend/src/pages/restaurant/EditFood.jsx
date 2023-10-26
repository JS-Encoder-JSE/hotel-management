import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import { TbReplaceFilled } from "react-icons/tb";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// form validation
const validationSchema = yup.object({
  foodName: yup.string().required("Food name is required"),
  // quantity: yup.number().when(["quantity"], ([quantity], schema) => {
  //   if (quantity)
  //     return schema
  //       .positive("Quantity must be a positive number")
  //       .integer("Quantity must be an integer");
  //   else return schema;
  // }),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .integer("Price must be an integer"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description at least 20 characters length"),
});

const EditFood = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      foodName: "",
      quantity: "",
      price: "",
      description: "",
      photo: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`max-w-xl bg-white rounded-2xl mx-auto p-8`}>
      <div
        className={`flex justify-between bg-green-slimy max-w-3xl mx-auto py-3 px-6 rounded`}
      >
        <h3 className={`flex text-2xl text-white space-x-1.5`}>
          <FaPencil />
          <span>Edit Food</span>
        </h3>
        <div
          className={`flex hover:text-white hover:bg-transparent border border-white items-center space-x-1.5 bg-white text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
      </div>
      <form
        className="form-control grid grid-cols-1 gap-4 mt-5"
        onSubmit={formik.handleSubmit}
      >
        <div className={`col-span-full relative h-64 rounded overflow-hidden`}>
          <div className={`absolute top-3 right-3`}>
            <button className="btn btn-md p-2 h-auto bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-gray-500/50 focus:border-green-slimy normal-case">
              <TbReplaceFilled />
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className={`w-full h-full`}
          />
        </div>
        {/* name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Food name"
            name="foodName"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.foodName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.foodName && Boolean(formik.errors.foodName) ? (
            <small className="text-red-600">
              {formik.touched.foodName && formik.errors.foodName}
            </small>
          ) : null}
        </div>
        {/* age box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.quantity && Boolean(formik.errors.quantity) ? (
            <small className="text-red-600">
              {formik.touched.quantity && formik.errors.quantity}
            </small>
          ) : null}
        </div>
        {/* adult box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Price"
            name="price"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && Boolean(formik.errors.price) ? (
            <small className="text-red-600">
              {formik.touched.price && formik.errors.price}
            </small>
          ) : null}
        </div>
        <div className="col-span-full flex flex-col gap-3">
          <textarea
            placeholder="Description"
            name="description"
            className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && Boolean(formik.errors.description) ? (
            <small className="text-red-600">
              {formik.touched.description && formik.errors.description}
            </small>
          ) : null}
        </div>
        {/* button */}
        <div className={`flex justify-between`}>
          <button
            type={"submit"}
            className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFood;
