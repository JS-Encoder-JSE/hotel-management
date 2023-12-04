import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useCashbackMutation } from "../../../redux/room/roomAPI";
import { useSelector } from "react-redux";

// form validation
const validationSchema = yup.object({
  paymentMethod: yup.string().required("Payment method is required"),

  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "Cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),

  amount: yup.number(),
});

const RefundPaymentCheckout = ({ totalRefund, data }) => {
  const [cashback] = useCashbackMutation();
  const { user } = useSelector((state) => state.authSlice);
  const formik = useFormik({
    initialValues: {
      amount: totalRefund,
      paymentMethod: "",
      trxID: "",
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      console.log(values);
      const response = cashback({
        manager_id: user?._id,
        bookingInfoId: data?._id,
        amount: totalRefund, // Specify the amount you want to pay
        paymentMethod: values?.paymentMethod, // Specify the payment method
        tran_id: values?.trxID,
        remark: "Payment for cashback",
      });
      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Refund Successful");
        
        // navigate("/dashboard/checkout");
      }
    },
  });
  // Price Validation
  const handleAmount = (e) => {
    const inputValue = e.target.value;
    const fieldName = e.target.amount;
    if (inputValue >= 0) {
      // Update the Formik state
      formik.handleChange(e);
    } else if (inputValue === "") {
      e.target.value = 0;
      formik.handleChange(e);
    }
  };
  useEffect(() => {
    // Set the amount field value when paidAmt changes
    formik.setFieldValue("amount");
  }, []);

  return (
    <div className="relative p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
      <div className="max-auto">
        <form
          className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <select
              name="paymentMethod"
              className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none"
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
                className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
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

          {/* advanced amount */}

          <div className="col-span-full flex flex-col gap-3">
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.amount}
              onChange={handleAmount}
              onBlur={formik.handleBlur}
              disabled
            />
            {formik.touched.amount && Boolean(formik.errors.amount) ? (
              <small className="text-red-600">
                {formik.touched.amount && formik.errors.amount}
              </small>
            ) : null}
          </div>

          {/* submit button */}
          <div className=" col-span-full text-end mb-5 ">
            <button
              type="submit"
              className=" btn btn-sm  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case max-w-xs px-9 h-auto md:me-0"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefundPaymentCheckout;
