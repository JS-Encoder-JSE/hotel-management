import React from "react";

const CustomerInfoPrint = ({ data }) => {
  console.log(data)
  return (
    <div className="py-2">
      <h2 className="font-bold">Invoice To</h2>
      <div className="flex gap-4 items-center">
        <div>
          <p>Name</p>
          <p>Phone</p>
          <p>Address</p>
        </div>
        <div>
          <p>: {data[0]?.guestName}</p>
          <p>: {data[0]?.mobileNumber}</p>
          <p>: {data[0]?.address}</p>
        </div>
    </div>
    </div>
  );
};

export default CustomerInfoPrint;
