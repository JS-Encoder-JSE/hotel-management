import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const SubAdminListView = () => {
  return (
    <div>
      <div className="w-full rounded-xl bg-white shadow-xl p-5">
        <div>
          <span
            className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </span>
        </div>

        <h1 className="text-2xl text-center ">Sub Admin Information</h1>
        <div className="card-body grid md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="card-title mb-3">Sub Admin Infomation </h2>
            <h6>Sub Admin Name : Jon Doe</h6>
            <h6>Sub Admin Address : Kolkata</h6>
            <h6>Sub Admin Number : +98812554</h6>
            <h6>Sub Admin Email : jondoe@gmail.com</h6>
          </div>
          <div className="">
            <h2 className="card-title mb-3">Sub Admin Other Information </h2>
            <h6> Sub Admin Joint Date :12-10-2023 </h6>
            <h6> Sub Admin Salary :12-10-2023 </h6>
            <h6>Status : Active</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminListView;
