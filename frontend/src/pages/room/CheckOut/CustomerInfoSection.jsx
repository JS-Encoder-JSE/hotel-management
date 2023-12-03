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
      <div className="p-5 grid grid-cols-4 items-center text-sm font-semibold">
        <div className="space-y-3">
          <p>Name</p>
          <p>Room No</p>
          {/*<p>Email ID</p>*/}
          <p>Mobile No</p>
          <p>Address</p>
          <p>Total Payable Amount</p>
          <p>Total Paid Amount</p>
          <p>Total Unpaid Amount</p>
          <p>Refund Amount</p>
        </div>
        <div className="col-span-3 space-y-3">
          <p>{data?.guestName}</p>
          <p>{data?.room_ids?.map((i) => i?.roomNumber).join(", ")}</p>
          {/*<p>dev.tajkir@gmail.com</p>*/}
          <p>{data?.mobileNumber}</p>
          <p>{data?.address}</p>

          <p>{totalPayableAmount}</p>
          <p>{data?.paid_amount}</p>
          <p>{data?.total_unpaid_amount < 0 ? 0 : data?.total_unpaid_amount}</p>
          <p>{totalRefund < 0 ? 0 : totalRefund}</p>
        </div>
      </div>
    </section>
  );
};

export default CustomerInfoSection;
