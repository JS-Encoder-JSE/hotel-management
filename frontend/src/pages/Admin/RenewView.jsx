import React from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

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

        <div className="card-body grid md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="card-title mb-3">Client Information </h2>
            <h6>Client Name : Jon Dow</h6>
            <h6>Hotel Address : Kolkata</h6>
            <h6>Contact Number : +98812554</h6>
            <h6>Client Email : jondoe@gmail.com</h6>
          </div>
          <div>
            <h2 className="card-title mb-3">License Information </h2>
            <h6> License Key : DSER-HGYT-GHTY-54564 </h6>
            <h6> Purchase Date :12-10-2023 </h6>
            <h6> Renew Date :12-10-2023 </h6>
            <h6> Expire Date : 14-10-2023</h6>
            <h6> Remaining Days: 15 Days</h6>
            <h6>Status : Active</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewView;
