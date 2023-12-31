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
          {/* <p>Time Format</p> */}
          {/*<p>Booking Time</p>*/}
          {/* <p>Booking Source</p> */}
        </div>
        <div className="col-span-3 space-y-3">
          <p>{data?.[0]?.guestName}</p>
          <p>{data?.[0]?.room_ids?.map((i) => i?.roomNumber).join(", ")}</p>
          {/*<p>dev.tajkir@gmail.com</p>*/}
          <p>{data?.[0]?.mobileNumber}</p>
          <p>{data?.[0]?.address}</p>
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
