import { useFormik } from "formik";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaArrowLeft, FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

const SubAdminListView = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      entries: "",
      search: "",
      startDate: "",
      endDate: "",
    },
  });

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

      <div className={`bg-white px-10 py-5 mt-12 rounded-xl`}>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Providing Total Owner Support</th>
                <th>Suspended Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={"hover:bg-gray-100"}
              >
                <td>Jon Doe</td>
                <td>{2 * 2}</td>
                <td>{2 * 4}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubAdminListView;
