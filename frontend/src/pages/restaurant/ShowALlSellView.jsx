import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegFilePdf } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

const ShowALlSellView = () => {
    const formik = useFormik({
        initialValues: {
          startDate: "",
          endDate: "",
        },
      });
  const navigate = useNavigate();

  return (
    <div className={`bg-white p-10 rounded-2xl space-y-8`}>
      <div className={`flex `}>
        <div
          className={`inline-flex bg-green-slimy text-white border border-green-slimy items-center space-x-1.5 hover:bg-transparent hover:text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
       
      </div>
      <div>
          <h1 className={`text-2xl text-center`}> All Order Information</h1>
        </div>
        <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Items Name</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(+formik.values.entries || 5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>23-11-2023</td>
                      <td>Rice</td>
                      <td>25 Kg</td>
                      <td>$5000</td>
                    </tr>
                  );
                })}
              </tbody>
              
            </table>
           <div className={`flex justify-end md:me-[100px] mt-5`}>
           <h1>Grand Total :  $25000</h1>
           </div>
          </div>

      {/* <div className="overflow-x-auto border mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Surveyor <br /> Quantity
              </th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>Grand Total</td>
              <td>5000</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div> */}
      
      <div className={`flex justify-end`}>
        <button className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case">
          {" "}
          <FaRegFilePdf />
          PDF
        </button>
      </div>
    </div>
  );
};

export default ShowALlSellView;
