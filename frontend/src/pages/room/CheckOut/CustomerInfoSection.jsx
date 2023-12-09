import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { convertedToDate } from "../../../utils/timeZone";
import {
  setCalculateAmountAfterDis,
  setCalculateNOD,
  setCalculatePayableAmount,
  setCalculateTotalRent,
  setCalculateUnpaidAmount,
  setToDate,
} from "../../../redux/checkoutInfoCal/checkoutInfoCalSlice";
import { parseISO } from "date-fns/esm";
import { getDiscountAmount } from "../../../utils/utils";

const CustomerInfoSection = ({ data }) => {
  const {
    refundAmount,
    additionalCharge,
    serviceCharge,
    texAmount,
    toDate,
    fromDate,
    roomInfo,
    bookingInfo,
    calculatePayableAmount,
    calculateAmountAfterDis,
  } = useSelector((state) => state.checkoutInfoCalSlice);

  const totalRefund =
    refundAmount - (additionalCharge + serviceCharge + texAmount);

  const totalPayableAmount =
    calculatePayableAmount + additionalCharge + serviceCharge + texAmount;

  const dispatch = useDispatch();

  const updatePayableAmount = (no_of_days) => {
    const afterDisPrice = getDiscountAmount(
      roomInfo?.total_room_rent,
      bookingInfo?.room_discount
    );
    const updatedDiscount = getDiscountAmount(
      Math.ceil(no_of_days * roomInfo?.rent_per_day),
      bookingInfo?.room_discount
    );
    const oldPayableAmount = data?.total_payable_amount - afterDisPrice;

    const updatedPayableAmount = oldPayableAmount + updatedDiscount;
    dispatch(setCalculatePayableAmount(updatedPayableAmount));
    dispatch(
      setCalculateUnpaidAmount(updatedPayableAmount - data?.paid_amount)
    );
  };
  const updatedTotalRent = (NOD) => {
    const totalRentWithOutSelectedRoom =
      data?.total_rent - roomInfo?.total_room_rent;
    const newTotalSelectedRoomRent = NOD * roomInfo?.rent_per_day;
    const updatedTotalRoomRent =
      totalRentWithOutSelectedRoom + newTotalSelectedRoomRent;
    dispatch(setCalculateTotalRent(updatedTotalRoomRent));
    const updatedTotalRentAfterDis = getDiscountAmount(
      updatedTotalRoomRent,
      bookingInfo?.room_discount
    );
    dispatch(setCalculateAmountAfterDis(updatedTotalRentAfterDis));
  };
  const handleToDateChange = (date) => {
    const no_of_days = Math.ceil(
      Math.abs(new Date(fromDate) - new Date(date)) / (24 * 60 * 60 * 1000)
    );

    const toDate = convertedToDate(date);
    dispatch(setToDate(toDate));
    dispatch(setCalculateNOD(no_of_days));
    updatePayableAmount(no_of_days);
    updatedTotalRent(no_of_days);
  };

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
            <p className="whitespace-nowrap">Total Balance:</p>
            <p className="whitespace-nowrap">{data?.total_balance}</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <p className="whitespace-nowrap">Select Checkout Date</p>
            <div>
              <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                name="from"
                placeholderText={`From`}
                selected={toDate ? parseISO(toDate) : ""}
                className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
                onChange={handleToDateChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerInfoSection;
