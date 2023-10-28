import React from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManagerListView = () => {
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

        <h1 className="text-2xl text-center ">Manager Information</h1>
        <div className="card-body grid md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="card-title mb-3">Manager Infomation </h2>
            <h6>Manger Name : Jon Doe</h6>
            <h6>Manger Address : Kolkata</h6>
            <h6>Manger Number : +98812554</h6>
            <h6>Manger Email : jondoe@gmail.com</h6>
          </div>
          <div className="">
            <h2 className="card-title mb-3">Manager Other Information </h2>
            <h6> Manager Joint Date :12-10-2023 </h6>
            <h6> Manager Salary :12-10-2023 </h6>
            <h6>Status : Active</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerListView;
