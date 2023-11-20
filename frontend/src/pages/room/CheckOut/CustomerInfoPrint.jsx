import React from "react";

const CustomerInfoPrint = ({ data }) => {
  return (
    <div>
      <p className="uppercase font-bold text-sm px-7 pb-2 ">Invoiced To</p>
      <div className=" px-4 grid grid-cols-4 items-center text-sm font-semibold">
        <div className="col-span-1 space-x-3">
          <p className="ml-3">Name</p>
          <p>Email ID</p>
          <p>Mobile No</p>
          <p>Address</p>
        </div>
        <div className="col-span-3 space-x-3">
          {/* <p>{user?.name}</p> */}
          <p className="ml-3"> : {data?.[0]?.guestName}</p>
          <p>: nissan@gmail.com</p>
          <p>: 01629880885</p>
          <p>: Dhaka</p>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="grid grid-cols-4 items-center text-sm font-semibold">
    //     <div className="space-x-3">
    //       <p>Name</p>
    //       <p>Room No</p>
    //       {/*<p>Email ID</p>*/}
    //       <p>Mobile No</p>
    //       <p>Address</p>
    //       {/* <p>Time Format</p> */}
    //       {/*<p>Booking Time</p>*/}
    //       {/* <p>Booking Source</p> */}
    //     </div>
    //     <div className="col-span-3 space-y-3">
    //       <p>{data?.[0]?.guestName}</p>
    //       <p>{data?.[0]?.room_ids?.map((i) => i?.roomNumber).join(", ")}</p>
    //       {/*<p>dev.tajkir@gmail.com</p>*/}
    //       <p>{data?.[0]?.mobileNumber}</p>
    //       <p>{data?.[0]?.address}</p>
    //       {/* <p>24 hrs</p> */}
    //       {/*<input*/}
    //       {/*  type="text"*/}
    //       {/*  disabled*/}
    //       {/*  placeholder="Instant"*/}
    //       {/*  className="pl-5 bg-transparent border-b focus:border-green-slimy cursor-not-allowed block"*/}
    //       {/*/>*/}
    //       {/* <input
    //         type="text"
    //         disabled
    //         placeholder="JS Encoder"
    //         className="pl-5 bg-transparent border-b focus:border-green-slimy cursor-not-allowed block"
    //       /> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default CustomerInfoPrint;
