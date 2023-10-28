import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Client Name is required"),
  adress: yup.string().required("Hotel Adress is required"),
  phoneNumber: yup.string().required("Client Phone Number is required"),
  email: yup.string().required("Client Email is required"),
  billInformation: yup.string().required("Client Bill Information is required"),
  licenseDuration: yup.string().required("license Duration is required"),
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
  status: yup.string().required("status is required"),
  numberOfHotel: yup.string().required("Number Of Hotels is required"),
  paymentMethod: yup.string().required("Payment method is required"),
  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),
 
 

});

const AdminNewLicense = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      adress:"",
      phoneNumber:"",
      email:"",
      billInformation:"",
      licenseDuration:"",
      fromDate:"",
      toDate:"",
      status:"",
      numberOfHotel:"",
      paymentMethod: "",
      trxID: "",

     
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
        <span>New License Add</span>
      </h3>
      <form
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        {/*Client name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Client Name"
            name="name"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
        {/* Hotel Address box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Hotel Address"
            name="adress"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.adress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.adress && Boolean(formik.errors.adress) ? (
            <small className="text-red-600">
              {formik.touched.adress && formik.errors.adress}
            </small>
          ) : null}
        </div>
        {/*Phone Number box */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Client Phone Number"
            name="phoneNumber"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber) ? (
            <small className="text-red-600">
              {formik.touched.phoneNumber && formik.errors.phoneNumber}
            </small>
          ) : null}
        </div>
        {/*Email box */}
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Client Email"
            name="email"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && Boolean(formik.errors.email) ? (
            <small className="text-red-600">
              {formik.touched.email && formik.errors.email}
            </small>
          ) : null}
        </div>
        {/*Billing Information box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Bill Information"
            name="billInformation"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.billInformation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.billInformation && Boolean(formik.errors.billInformation) ? (
            <small className="text-red-600">
              {formik.touched.billInformation && formik.errors.billInformation}
            </small>
          ) : null}
        </div>
        {/*License Duration box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="License Duration"
            name="licenseDuration"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.licenseDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.licenseDuration && Boolean(formik.errors.licenseDuration) ? (
            <small className="text-red-600">
              {formik.touched.licenseDuration && formik.errors.licenseDuration}
            </small>
          ) : null}
        </div>
        {/*Billing From box */}
        <div className="flex flex-col gap-3">
          <input
            type="date"
            placeholder="From"
            name="fromDate"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.fromDate}
            onChange={formik.handleChange}
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
          <input
            type="date"
            placeholder="To"
            name="toDate"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.toDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.toDate && Boolean(formik.errors.toDate) ? (
            <small className="text-red-600">
              {formik.touched.toDate && formik.errors.toDate}
            </small>
          ) : null}
        </div>
        {/* Status box */}
        <div className="flex flex-col gap-3">
          <select
            name="status"
            className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none focus:border-green-slimy"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Status
            </option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
            <option value="Suspended">Suspended</option>
          </select>
          {formik.touched.status && Boolean(formik.errors.status) ? (
            <small className="text-red-600">
              {formik.touched.status && formik.errors.status}
            </small>
          ) : null}
        </div>

        {/*Number Of Hotels box */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Number Of Hotels"
            name="numberOfHotel"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.numberOfHotel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.numberOfHotel && Boolean(formik.errors.numberOfHotel) ? (
            <small className="text-red-600">
              {formik.touched.numberOfHotel && formik.errors.numberOfHotel}
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

     
        {/* submit button */}
        <button
          type="submit"
          className="col-span-full btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case h-auto p-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AdminNewLicense;
