import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

const EditRenew = () => {
    const navigate = useNavigate();
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
    <div className={`space-y-5 bg-white p-2 rounded-2xl`}>
            <div>
            <span
              className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </span>
          </div>
      <h1 className="text-2xl text-center ">Update hotel Renew</h1>
      <hr  className={``}/>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditRenew;