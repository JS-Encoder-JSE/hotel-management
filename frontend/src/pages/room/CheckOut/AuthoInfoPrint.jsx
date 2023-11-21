import React from "react";

const AuthoInfoPrint = ({ hotelInfo,isHotelSuccess }) => {
  console.log(hotelInfo);

const {name,email,phone_no,address}=hotelInfo !== undefined? hotelInfo[0] : [] ;

  // if(!hotelInfo){
  //   return <>Loading</>
  // }
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
          <p>: {name}</p>
          <p>: {email}</p>
          <p>: {phone_no}</p>
          <p>: {address}</p>
        </div>
    </div>
    </div>
  );
};

export default AuthoInfoPrint;
