import { useFormik } from "formik";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaUserAltSlash,
  FaUserCheck,
  FaUserLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SubAdminReport from "./SubAdminReport";
import ReactPaginate from "react-paginate";

const SubAdminListView = () => {
  const navigate = useNavigate();
  const [roomsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

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
            <h6> Sub Admin Joint Date : 12-10-2023 </h6>
            <h6> Sub Admin Salary : 20,000 </h6>
            <h6>Status : Active</h6>
          </div>
        </div>
      </div>

      {/* Owner List */}
      <div className="card w-full bg-white shadow-xl mt-10">
        <div className="card-body">
          <h1 className="text-2xl text-center ">Owner List</h1>
          <div className="overflow-x-auto mt-10">
            <table className="table border">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th> {++idx}</th>
                      <td className="font-bold">Jon Doe</td>
                      <td>jondoe@gmail.com</td>
                      <td className="flex gap-3">
                        <button type="button" title="suspend owner">
                          <FaUserAltSlash className="hover:text-green-slimy duration-300 text-lg" />
                        </button>
                        <button type="button" title="lock owner">
                          <FaUserLock className="hover:text-green-slimy duration-300 text-lg" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h6 className="m-5">Total: 5</h6>
            <div className="flex justify-center mt-10">
              <ReactPaginate
                containerClassName="join rounded-none"
                pageLinkClassName="join-item btn btn-md bg-transparent"
                activeLinkClassName="btn-active !bg-green-slimy text-white"
                disabledLinkClassName="btn-disabled"
                previousLinkClassName="join-item btn btn-md bg-transparent"
                nextLinkClassName="join-item btn btn-md bg-transparent"
                breakLinkClassName="join-item btn btn-md bg-transparent"
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Suspended Owner */}
      <div className="card w-full bg-white shadow-xl mt-10">
        <div className="card-body">
          <h1 className="text-2xl text-center ">Suspended Owner</h1>
          <div className="overflow-x-auto mt-10">
            <table className="table border">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th> {++idx}</th>
                      <td className="font-bold">Jon Doe</td>
                      <td>jondoe@gmail.com</td>
                      <td className={`space-x-1.5`}></td>
                      <td>
                        <button type="button" title="unsuspend owner">
                          <FaUserCheck className="hover:text-green-slimy duration-300 text-lg" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h6 className="m-5">Total: 5</h6>
            <div className="flex justify-center mt-10">
              <ReactPaginate
                containerClassName="join rounded-none"
                pageLinkClassName="join-item btn btn-md bg-transparent"
                activeLinkClassName="btn-active !bg-green-slimy text-white"
                disabledLinkClassName="btn-disabled"
                previousLinkClassName="join-item btn btn-md bg-transparent"
                nextLinkClassName="join-item btn btn-md bg-transparent"
                breakLinkClassName="join-item btn btn-md bg-transparent"
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
      <SubAdminReport />
    </div>
  );
};

export default SubAdminListView;
