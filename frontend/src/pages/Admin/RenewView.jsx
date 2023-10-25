import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const RenewView = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="card w-full bg-white shadow-xl p-5">
       <div>
       
       <span
          className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </span>
       </div>
       
       <h1 className="text-2xl text-center ">Client Information</h1>
        <div className="card-body grid md:grid-cols-4 gap-4">
          <div className="">
            <h2 className="card-title mb-3">Client Information </h2>
            <p>Client Name : Jon Dow</p>
            <p>Hotel Address : Kolkata</p>
            <p>Contact Number : +98812554</p>
            <p>Client Email : jondoe@gmail.com</p>
          </div>

          <div className="">
            <h2 className="card-title mb-3">Bill Information </h2>
            <p>Bill From Date :12-10-2023 </p>
            <p>Bill To Date : 14-10-2023</p>
          </div>
          <div className="">
            <h2 className="card-title mb-3">Bill Information </h2>
            <p>Cash : $5000 </p>
            <p>Card : $00</p>
            <p>Mobile Banking : $00</p>
          </div>
          <div className="">
            <h2 className="card-title mb-3">Bill Information </h2>
            <p>Number Of Hotels : 02</p>
            <p>Status : Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewView;
