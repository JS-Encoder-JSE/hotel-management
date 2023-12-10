import React from "react";

const CustomerInfoPrint = ({ data }) => {
  return (
    <div className="py-2">
      <h2 className="font-bold">Invoice To</h2>
      <div className="flex gap-4 items-center">
        <div className="grid grid-cols-2">
          <p>Name</p>
          <p>: {data.guestName}</p>
          <p>Phone</p>
          <p>: {data.mobileNumber}</p>
          <p>Address</p>
          <p>: {data.address}</p>
        </div>
        <div>
          
         
         
        </div>
    </div>
    </div>
  );
};

export default CustomerInfoPrint;
