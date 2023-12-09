import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import RefundPaymentSection from "../../../components/room/RefundPaymentSection.jsx";
import RefundPaymentCheckout from "./RefundPaymentCheckout.jsx";
import { useSelector } from "react-redux";

const RefundPaymentModal = ({ data, totalRefund }) => {
  const { refundAmount, additionalCharge, serviceCharge, texAmount } =
    useSelector((state) => state.checkoutInfoCalSlice);
  // const totalRefund =
  //   refundAmount - (additionalCharge + serviceCharge + texAmount);
  const closeRef = useRef();
  return (
    <>
      <form className="" autoComplete="off" method="dialog">
        <button
          ref={closeRef}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>

      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Refund Payment</h3>
        <hr />
        <RefundPaymentCheckout totalRefund={totalRefund} data={data} />
      </div>
    </>
  );
};

export default RefundPaymentModal;
