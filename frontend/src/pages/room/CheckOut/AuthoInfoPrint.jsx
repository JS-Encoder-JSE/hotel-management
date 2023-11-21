import React from "react";

const AuthoInfoPrint = ({ hotelInfo }) => {
  if(!hotelInfo){
    return <>Loading</>
  }
  return (
    <div className="py-2">
      <h2 className="font-bold">Invoice From</h2>
      <div className="flex gap-4 items-center">
        <div>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Address</p>
        </div>
        <div>
          <p>: {hotelInfo[0]?.name}</p>
          <p>: {hotelInfo[0]?.email}</p>
          <p>: {hotelInfo[0]?.phone_no}</p>
          <p>: {hotelInfo[0]?.address}</p>
        </div>
    </div>
    </div>
  );
};

export default AuthoInfoPrint;
