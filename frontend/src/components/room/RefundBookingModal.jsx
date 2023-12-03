import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import {
  useAddBookingMutation,
  useGetRoomsAndHotelsQuery,
  useRoomsQuery,
} from "../../redux/room/roomAPI.js";
import DatePicker from "react-datepicker";
import store from "../../redux/store.js";
import toast from "react-hot-toast";
import { fromDateIsoConverter, toDateIsoConverter } from "../../utils/utils.js";
import RefundPaymentSection from "./RefundPaymentSection.jsx";

// form validation
const validationSchema = yup.object({
  room_arr: yup.array().required("Room IDs are required"),
  // hotel_id: yup.string().required("Hotel ID is required"),
  guestName: yup.string().required("Guest name is required"),
  address: yup.string().required("Address is required"),
  mobileNumber: yup.string().required("Mobile number is required"),
  emergency_contact: yup.string().required("Emergency contact is required"),
  adult: yup
    .number()
    .required("Adult is required")
    .positive("Adult must be a positive number")
    .integer("Adult must be an integer"),
  //   children: yup.number().when([], {
  //   is: (children) => children && children.length > 0,
  //   children: yup
  //     .number()
  //     .positive("Children must be a positive number")
  //     .integer("Children must be an integer"),
  // }),
  children: yup.number(),

  paymentMethod: yup.string().required("Payment method is required"),
  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "Cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),

  from: yup.string().required("From Date is required"),
  to: yup.string().required("To Date is required"),
  amount: yup.number(),
  nationality: yup.string().required("Nationality is required"),
  bookingMethod: yup.string().required("Booking method is required"),
});

const RefundBookingModal = () => {

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
    //  else {
    //     // Set inputValue to 0 and update the Formik state
    //     e.target.value = 0;
    //     formik.handleChange(e);
    // }
  };

  const closeRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      room_arr: [],
      // hotel_id: "",
      guestName: "",
      address: "",
      mobileNumber: "",
      emergency_contact: "",
      adult: "",
      children: "",
      paymentMethod: "",
      trxID: "",
      from: new Date(),
      to: "",
      amount: "",
      discount: "",
      nationality: "",
      bookingMethod: "",
      status: "Active",
    },

    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      const obj = {
        ...values,
        from: fromDateIsoConverter(values.from),
        to: toDateIsoConverter(values.to),
      };
    },
  });

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };
  const { data: rooms, refetch } = useRoomsQuery({
    id: formik.values.hotel_id,
    limit: 1000000,
  });


  return (
    <>
      <form  className="" autoComplete="off" method="dialog">
        <button
          ref={closeRef}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => formik.handleReset()}
        >
          ✕
        </button>
      </form>

      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Refund Payment</h3>
        <hr />
       <RefundPaymentSection/>
      </div>
    </>
  );
};

export default RefundBookingModal;
