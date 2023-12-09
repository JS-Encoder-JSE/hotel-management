import React, { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useSelector } from "react-redux";

const BillingSectionPrint = ({
  data,
  totalBilling,
  setTotalBilling,
  setPBill,
}) => {
  const billingState = useSelector((state) => state.checkoutInfoCalSlice);
  const {
    subTotals,
    extraDiscount,
    tax,
    serviceCharge,
    additionalCharge,
    discountOffer,
    grandTotal,
    roomPostedBill,
  } = billingState;
  return (
    <section>
      <div className=" grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <p>SubTotal</p>
          {/* <p>Tax</p> */}
          <p>Additional Changes</p>
          <p>Service Charge</p>
          <p>Room Posted Bill</p>
          <p className="text-lg font-bold">GrandTotal</p>
        </div>
        <div className="space-y-4">
          <p>: ${subTotals}</p>
          {/* <p>: ${tax}</p> */}
          <p>: ${additionalCharge}</p>
          <p>: ${serviceCharge}</p>
          <p>: ${roomPostedBill}</p>
          <p>
            : ${subTotals + additionalCharge + serviceCharge + roomPostedBill}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BillingSectionPrint;
