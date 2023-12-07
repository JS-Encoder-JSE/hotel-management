import React, { useState } from "react";
import { useSelector } from "react-redux";

const CustomerInfoSection = ({ data }) => {
  const { refundAmount, additionalCharge, serviceCharge, texAmount } =
    useSelector((state) => state.checkoutInfoCalSlice);
  const totalRefund =
    refundAmount - (additionalCharge + serviceCharge + texAmount);
  const totalPayableAmount =
    data?.total_payable_amount + additionalCharge + serviceCharge + texAmount;
  return (
    <section className="bg-white rounded">
      <h3 className="p-5 text-xl">Customer Details</h3>
      <hr />
      <div className="p-5 grid md:grid-cols-2 grid-cols-1 items-center text-sm font-semibold ">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Name :</p>
            <p className="whitespace-nowrap">{data?.guestName}</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Room No :</p>
            <p className="whitespace-nowrap">
              {data?.room_ids?.map((i) => i?.roomNumber).join(", ")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Mobile No :</p>
            <p className="whitespace-nowrap">{data?.mobileNumber}</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Address :</p>
            <p className="whitespace-nowrap">{data?.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Total Payable Amount :</p>
            <p className="whitespace-nowrap">{totalPayableAmount}</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Total Paid Amount :</p>
            <p className="whitespace-nowrap">{data?.paid_amount}</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Total Unpaid Amount :</p>
            <p className="whitespace-nowrap">
              {totalPayableAmount - data?.paid_amount < 0
                ? 0
                : totalPayableAmount - data?.paid_amount}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Refund Amount :</p>
            <p className="whitespace-nowrap">
              {totalRefund < 0 ? 0 : totalRefund}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerInfoSection;
