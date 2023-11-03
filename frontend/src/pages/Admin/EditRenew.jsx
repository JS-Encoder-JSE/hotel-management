import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

// form validation
const validationSchema = yup.object({
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
  status: yup.string().required("Status is required"),
  paymentMethod: yup.string().required("Payment method is required"),
  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .integer("Amount must be an integer"),
});

const EditRenew = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fromDate: "",
      toDate: "",
      status: "",
      paymentMethod: "",
      trxID: "",
      amount: "",
      paymentFor: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`relative space-y-5 bg-white px-5 py-10 rounded-2xl`}>
      <div className={`absolute top-5 left-5`}>
        <span
          className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </span>
      </div>
      <h1 className="text-2xl text-center capitalize">License Renew</h1>
      <hr />
      <form
        className="form-control max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          formik.values.paymentMethod === "cash" ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name=""
                className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2 input-disabled"
                value={`Khalid Mahmud`}
                readOnly
              />
              {formik.touched.trxID && Boolean(formik.errors.trxID) ? (
                <small className="text-red-600">
                  {formik.touched.trxID && formik.errors.trxID}
                </small>
              ) : null}
            </div>
          ) : null}
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
          {/* Amount box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Amount"
              name="amount"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.amount && Boolean(formik.errors.amount) ? (
              <small className="text-red-600">
                {formik.touched.amount && formik.errors.amount}
              </small>
            ) : null}
          </div>
          {/*Billing From box */}
          <div className="flex flex-col gap-3">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="fromDate"
              placeholderText={`From`}
              selected={formik.values.fromDate}
              className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
              onChange={(date) => formik.setFieldValue("fromDate", date)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fromDate && Boolean(formik.errors.fromDate) ? (
              <small className="text-red-600">
                {formik.touched.fromDate && formik.errors.fromDate}
              </small>
            ) : null}
          </div>
          {/*Billing To box */}
          <div className="flex flex-col gap-3">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="toDate"
              placeholderText={`To`}
              selected={formik.values.toDate}
              className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
              onChange={(date) => formik.setFieldValue("toDate", date)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.toDate && Boolean(formik.errors.toDate) ? (
              <small className="text-red-600">
                {formik.touched.toDate && formik.errors.toDate}
              </small>
            ) : null}
          </div>
          {/* Payment For */}
          <div className="flex flex-col gap-3">
            <select
                name="paymentFor"
                className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none focus:border-green-slimy"
                value={formik.values.paymentFor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                Payment For
              </option>
              <option value="Renew">Renew</option>
            </select>
            {formik.touched.status && Boolean(formik.errors.status) ? (
                <small className="text-red-600">
                  {formik.touched.status && formik.errors.status}
                </small>
            ) : null}
          </div>
          {/* Status box */}
          <div className="flex flex-col gap-3">
            <select
              name="status"
              className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none focus:border-green-slimy"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                Status
              </option>
              <option value="Active">Active</option>
            </select>
            {formik.touched.status && Boolean(formik.errors.status) ? (
              <small className="text-red-600">
                {formik.touched.status && formik.errors.status}
              </small>
            ) : null}
          </div>
          {/* submit button */}
          <button
            type="submit"
            className={`${
              !formik.values.paymentMethod ? "col-span-full" : ""
            } btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRenew;
