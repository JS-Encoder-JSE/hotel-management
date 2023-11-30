import React, { useState } from "react";

const CustomerInfoSection = ({ data }) => {
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
          <p>Total Paid Amount</p>
          <p>Total Room Rent</p>
          <p>Discount For Room</p>
          <p>Unpaid Room Rent</p>
          {/* <p>Time Format</p> */}
          {/*<p>Booking Time</p>*/}
          {/* <p>Booking Source</p> */}
        </div>
        <div className="col-span-3 space-y-3">
          <p>{data?.guestName}</p>
          <p>{data?.room_ids?.map((i) => i?.roomNumber).join(", ")}</p>
          {/*<p>dev.tajkir@gmail.com</p>*/}
          <p>{data?.mobileNumber}</p>
          <p>{data?.address}</p>
          <p>{data?.paid_amount}</p>
          <p>{data?.total_rent}</p>
          <p>
            {data
              ? Math.ceil(data?.total_rent - data?.total_rent_after_dis)
              : 0}
          </p>
          <p>{Math.ceil(data?.total_rent_after_dis)}</p>
          {/* <p>24 hrs</p> */}
          {/*<input*/}
          {/*  type="text"*/}
          {/*  disabled*/}
          {/*  placeholder="Instant"*/}
          {/*  className="pl-5 bg-transparent border-b focus:border-green-slimy cursor-not-allowed block"*/}
          {/*/>*/}
          {/* <input
            type="text"
            disabled
            placeholder="JS Encoder"
            className="pl-5 bg-transparent border-b focus:border-green-slimy cursor-not-allowed block"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default CustomerInfoSection;
