import React from "react";

const AuthoInfoPrint = ({ user }) => {
  return (
    <div>
      <p className="uppercase font-bold text-sm px-7 pb-2 ">Invoiced From</p>
      <div className=" px-4 grid grid-cols-4 items-center text-sm font-semibold">
        <div className="col-span-1 space-x-3">
          <p className="ml-3">Name</p>
          <p>Designation</p>
          {/*<p>Email ID</p>*/}
          <p>Mobile No</p>
          <p>Address</p>
        </div>
        <div className="col-span-3 space-x-3">
          {/* <p>{user?.name}</p> */}
          <p className="ml-3"> : Hotel</p>
          <p>: {user?.role}</p>
          <p>: {user?.phone_no ? user.phone_no : "01629880885"}</p>
          <p>: {user?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthoInfoPrint;
