import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// form validation
const validationSchema = yup.object({
  roomNumber: yup.string().required("Room number is required"),
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  adult: yup
    .number()
    .required("Adult is required")
    .positive("Adult must be a positive number")
    .integer("Adult must be an integer"),
  // children: yup.number().when(["children"], ([children], schema) => {
  //   if (children)
  //     return schema
  //       .positive("Children must be a positive number")
  //       .integer("Children must be an integer");
  //   else return schema;
  // }),
  paymentMethod: yup.string().required("Payment method is required"),
  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),
  // discount: yup.number().when(["discount"], ([discount], schema) => {
  //   if (discount)
  //     return schema
  //       .positive("Discount must be a positive number")
  //       .integer("Discount must be an integer");
  //   else return schema;
  // }),
});

const CheckIn = () => {
  const formik = useFormik({
    initialValues: {
      roomNumber: "",
      name: "",
      age: "",
      adult: "",
      children: "",
      paymentMethod: "",
      trxID: "",
      discount: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`max-w-xl bg-white rounded-2xl mx-auto p-8`}>
      <h3 className={`text-2xl font-semibold mb-3`}>Check In</h3>
      <hr />
      <form
        className="form-control grid grid-cols-1 gap-4 mt-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <select
            name="roomNumber"
            className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
            value={formik.values.roomNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Room number
            </option>
            <option value={101}>101</option>
            <option value={102}>102</option>
            <option value={103}>103</option>
          </select>
          {formik.touched.roomNumber && Boolean(formik.errors.roomNumber) ? (
            <small className="text-red-600">
              {formik.touched.roomNumber && formik.errors.roomNumber}
            </small>
          ) : null}
        </div>
        {/* name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Guest name"
            name="name"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && Boolean(formik.errors.name) ? (
            <small className="text-red-600">
              {formik.touched.name && formik.errors.name}
            </small>
          ) : null}
        </div>
        {/* age box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Age"
            name="age"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && Boolean(formik.errors.age) ? (
            <small className="text-red-600">
              {formik.touched.age && formik.errors.age}
            </small>
          ) : null}
        </div>
        {/* adult box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Adult"
            name="adult"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.adult}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.adult && Boolean(formik.errors.adult) ? (
            <small className="text-red-600">
              {formik.touched.adult && formik.errors.adult}
            </small>
          ) : null}
        </div>
        {/* children box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Children"
            name="children"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.children}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.children && Boolean(formik.errors.children) ? (
            <small className="text-red-600">
              {formik.touched.children && formik.errors.children}
            </small>
          ) : null}
        </div>
        {/* payment method box */}
        <div className="flex flex-col gap-3">
          <select
            name="paymentMethod"
            className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Payment Method
            </option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="mfs">Mobile Banking</option>
          </select>
          {formik.touched.paymentMethod &&
          Boolean(formik.errors.paymentMethod) ? (
            <small className="text-red-600">
              {formik.touched.paymentMethod && formik.errors.paymentMethod}
            </small>
          ) : null}
        </div>
        {formik.values.paymentMethod &&
        formik.values.paymentMethod !== "cash" ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Transaction ID"
              name="trxID"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
              value={formik.values.trxID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.trxID && Boolean(formik.errors.trxID) ? (
              <small className="text-red-600">
                {formik.touched.trxID && formik.errors.trxID}
              </small>
            ) : null}
          </div>
        ) : null}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Discount"
            name="discount"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.discount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.discount && Boolean(formik.errors.discount) ? (
            <small className="text-red-600">
              {formik.touched.discount && formik.errors.discount}
            </small>
          ) : null}
        </div>
        {/* button */}
        <div className={`flex justify-between`}>
          <button
            type={"submit"}
            className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckIn;
