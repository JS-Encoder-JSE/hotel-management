import { useFormik } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { validationSchema } from "../../components/Yup/EditRenewVal.jsx";
import { useRenewLicenseMutation } from "../../redux/admin/sls/slsAPI.js";
import { convertedEndDate, convertedStartDate } from "../../utils/timeZone.js";

const EditRenew = () => {
  const { id: user_id } = useParams();
  const navigate = useNavigate();
  const [renewLicense, { isLoading }] = useRenewLicenseMutation();

  const formik = useFormik({
    initialValues: {
      fromDate: "",
      toDate: "",
      // status: "",
      paymentMethod: "",
      trxID: "",
      amount: "",
      // paymentFor: "",
      remarks: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const obj = { ...values };
      const {
        fromDate: bill_from,
        toDate: bill_to,
        paymentMethod: payment_method,
        trxID: tran_id,
        amount,
        remarks: remark,
      } = obj;

      const response = await renewLicense({
        user_id,
        bill_from:convertedStartDate(bill_from),
        bill_to : convertedEndDate(bill_to),
        payment_method,
        tran_id,
        amount,
        remark,
      });

      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        navigate(-1)
        toast.success(response.data.message);
      }
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
      <h1 className="bg-green-slimy text-2xl text-center text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7">License Renew</h1>
      <hr />
      <form autoComplete="off"
        className="form-control max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* payment method box */}
          <div
            className={`flex flex-col gap-3 ${
              formik.values.paymentMethod &&
              formik.values.paymentMethod !== "Cash"
                ? "col-span-full"
                : ""
            }`}
          >
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
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Mobile_Banking">Mobile Banking</option>
            </select>
            {formik.touched.paymentMethod &&
            Boolean(formik.errors.paymentMethod) ? (
              <small className="text-red-600">
                {formik.touched.paymentMethod && formik.errors.paymentMethod}
              </small>
            ) : null}
          </div>
          {formik.values.paymentMethod &&
          formik.values.paymentMethod !== "Cash" ? (
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
            onWheel={ event => event.currentTarget.blur() }
              type="number"
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
          {/*<div className="flex flex-col gap-3">*/}
          {/*  <select*/}
          {/*    name="paymentFor"*/}
          {/*    className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none focus:border-green-slimy"*/}
          {/*    value={formik.values.paymentFor}*/}
          {/*    onChange={formik.handleChange}*/}
          {/*    onBlur={formik.handleBlur}*/}
          {/*  >*/}
          {/*    <option value="" selected disabled>*/}
          {/*      Payment For*/}
          {/*    </option>*/}
          {/*    <option value="Renew">Renew</option>*/}
          {/*  </select>*/}
          {/*  {formik.touched.paymentFor && Boolean(formik.errors.paymentFor) ? (*/}
          {/*    <small className="text-red-600">*/}
          {/*      {formik.touched.paymentFor && formik.errors.paymentFor}*/}
          {/*    </small>*/}
          {/*  ) : null}*/}
          {/*</div>*/}
          {/* Status box */}
          {/*<div className="flex flex-col gap-3">*/}
          {/*  <select*/}
          {/*    name="status"*/}
          {/*    className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none focus:border-green-slimy"*/}
          {/*    value={formik.values.status}*/}
          {/*    onChange={formik.handleChange}*/}
          {/*    onBlur={formik.handleBlur}*/}
          {/*  >*/}
          {/*    <option value="" selected disabled>*/}
          {/*      Status*/}
          {/*    </option>*/}
          {/*    <option value="Active">Active</option>*/}
          {/*  </select>*/}
          {/*  {formik.touched.status && Boolean(formik.errors.status) ? (*/}
          {/*    <small className="text-red-600">*/}
          {/*      {formik.touched.status && formik.errors.status}*/}
          {/*    </small>*/}
          {/*  ) : null}*/}
          {/*</div>*/}
          {/* Remarks box */}
          <div className="flex flex-col gap-3 col-span-full">
            <textarea
              placeholder="Remarks"
              name="remarks"
              className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
              value={formik.values.remarks}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.remarks && Boolean(formik.errors.remarks) ? (
              <small className="text-red-600">
                {formik.touched.remarks && formik.errors.remarks}
              </small>
            ) : null}
          </div>
          {/* submit button */}
          <button
            type="submit"
            className={`col-span-full btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
          >
            <span>Update</span>
            {isLoading ? (
              <span
                className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                role="status"
              ></span>
            ) : null}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRenew;
