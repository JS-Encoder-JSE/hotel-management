import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import PaymentMethod from "./PaymentMethod.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF.jsx";
import { jsPDF } from "jspdf";
import ReactToPrint from "react-to-print";
import CheckOutPrint from "./CheckOutPrint.jsx";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal.jsx";
import RefundPaymentModal from "./RefundPaymentModal.jsx";

const PaymentSection = ({
  pBill,
  formik,
  paymentList,
  setPaymentList,
  data,
  isHotelSuccess,
  hotelInfo,
  roomData,
  addCheckOutLoading,
  totalPayableAmount,
}) => {
  const [PDF, setPDF] = useState([]);
  const [colAmount, setColAmount] = useState(0);
  const [checkoutBtn, setCheckoutBtn] = useState(true);
  const [remainAmount, setRemainAmount] = useState(5493.0);
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [changeAmount, setChangeAmount] = useState(collectedAmount);
  const {
    refundAmount,
    additionalCharge,
    serviceCharge,
    texAmount,
    bookingInfo,
    calculateUnpaidAmount,
  } = useSelector((state) => state.checkoutInfoCalSlice);
  const totalRefund =
    refundAmount - (additionalCharge + serviceCharge + texAmount);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...paymentList];
    list[index][name] = value;
    setPaymentList(list);
    // const calculatedLimit = Math.ceil(totalPayableAmount - data?.paid_amount);
    // if (data?.room_ids?.length === 1) {
    //   if (name === "amount") {
    //     if (Number(value) <= calculatedLimit) {
    //       const list = [...paymentList];
    //       list[index][name] = value;
    //       setPaymentList(list);
    //     }
    //   } else {
    //     const list = [...paymentList];
    //     list[index][name] = value;
    //     setPaymentList(list);
    //   }
    // } else {
    //   const list = [...paymentList];
    //   list[index][name] = value;
    //   setPaymentList(list);
    // }
  };

  const handleRemove = (index) => {
    const list = [...paymentList];
    list.splice(index, 1);
    setPaymentList(list);
  };
  const handleAdd = () => {
    setPaymentList([
      ...paymentList,
      { method: "", amount: "", trx: "", date: "" },
    ]);
  };
  useEffect(() => {
    const totalCol = paymentList.reduce(
      (total, current) =>
        total + (Boolean(current.amount) ? +current.amount : 0),
      0
    );

    setColAmount(totalCol);
  }, [paymentList]);

  // for printing
  const componentRef = useRef();
  return (
    <section>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Left Side */}
        <div className="bg-white rounded">
          {/* bill statement */}
          <h3 className="p-5 text-xl mt-5">Bill Statement</h3>
          <hr />
          <PaymentMethod
            paymentList={paymentList}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleChange={handleChange}
            totalRefund={totalRefund}
            pBill={pBill}
            roomData={roomData}
          />
        </div>
        {/* Right Side */}
        <div className="bg-white rounded">
          <h3 className="p-5 text-xl mt-5">Balance Details</h3>
          <hr />

          <div className="p-5 grid grid-cols-3 items-center text-sm font-semibold">
            <div className="space-y-3">
              <p>Remain Amount</p>
              <p>Refund Amount</p>
              <p>Collected Amount</p>
            </div>
            <div className="col-span-2 space-y-3">
              <p>
                {pBill - bookingInfo?.total_balance < 0
                  ? 0
                  : pBill - bookingInfo?.total_balance - colAmount}
              </p>
              <p>{totalRefund < 0 ? 0 : totalRefund}</p>

              <p>{Math.ceil(colAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-5">
        <ReactToPrint
          trigger={() => (
            <button
              title="please select payment method"
              className="bg-green-slimy text-white px-2 rounded-sm"
            >
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <CheckOutPrint
              pBill={pBill}
              colAmount={colAmount}
              data={data}
              paymentList={paymentList}
              isHotelSuccess={isHotelSuccess}
              hotelInfo={hotelInfo}
              roomData={roomData}
            />
          </div>
        </div>

        <button
          type={`button`}
          onClick={() => formik.handleSubmit()}
          className={`btn btn-md bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case 
          ${addCheckOutLoading ? "btn-disabled" : ""}
          `}
        >
          {totalRefund < 1
            ? "Checkout"
            : data?.room_ids?.length == 1
            ? "Checkout & Refund"
            : "Checkout"}
          {addCheckOutLoading ? (
            <span
              className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
              role="status"
            ></span>
          ) : null}
        </button>
      </div>
    </section>
  );
};

export default PaymentSection;
