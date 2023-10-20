import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.string().required("Age is required"),
  adult: yup.string().required("Adult is required"),
  paymentMethod: yup.string().required("Payment method is required"),
});

const CheckInForm = ({ setCheckIn }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      adult: "",
      children: "",
      paymentMethod: "",
      cardNumber: "",
      mobileBankingNo: "",
      trxID: "",
      discount: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form
      className="form-control grid grid-cols-1 gap-4 max-w-xl"
      onSubmit={formik.handleSubmit}
    >
      {/* name box */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Guest name"
          name="name"
          className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
          type="number"
          placeholder="Age"
          name="age"
          className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
          type="number"
          placeholder="Adult"
          name="adult"
          className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
          type="number"
          placeholder="Children"
          name="children"
          className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
          className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
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
      {formik.values.paymentMethod === "card" ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Card Number"
            name="cardNumber"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.cardNumber && Boolean(formik.errors.cardNumber) ? (
            <small className="text-red-600">
              {formik.touched.cardNumber && formik.errors.cardNumber}
            </small>
          ) : null}
        </div>
      ) : null}
      {formik.values.paymentMethod === "mfs" ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Mobile Banking Number"
            name="mobileBankingNo"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.mobileBankingNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobileBankingNo &&
          Boolean(formik.errors.mobileBankingNo) ? (
            <small className="text-red-600">
              {formik.touched.mobileBankingNo && formik.errors.mobileBankingNo}
            </small>
          ) : null}
        </div>
      ) : null}
      {formik.values.paymentMethod && formik.values.paymentMethod !== "cash" ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Transaction ID"
            name="trxID"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
          className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
          className="btn btn-sm min-w-[8rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
        >
          Confirm
        </button>
        <button
          type={"button"}
          className="btn btn-sm min-w-[8rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
          onClick={() => setCheckIn(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckInForm;
