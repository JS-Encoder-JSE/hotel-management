import React, { useState } from "react";
import { FaEye, FaFileDownload } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CreateReport from "../pdf/CreateReport.jsx";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const StatusHistory = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
  });

  const [historyPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  return (
    <div className="card w-full bg-white shadow-xl">
      <div className="card-body space-y-10">
        <h1 className="text-2xl text-center ">Status History</h1>
        <div className="flex justify-between">
          <div className={`flex gap-3`}>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="startDate"
              placeholderText={`From`}
              selected={formik.values.startDate}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              onChange={(date) => formik.setFieldValue("startDate", date)}
              onBlur={formik.handleBlur}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="endDate"
              placeholderText={`To`}
              selected={formik.values.endDate}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              onChange={(date) => formik.setFieldValue("endDate", date)}
              onBlur={formik.handleBlur}
            />
            <button
              type={"button"}
              className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
            >
              Search
            </button>
          </div>
          <button
            type={"button"}
            className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            <PDFDownloadLink
              document={<CreateReport />}
              fileName={`${new Date().toLocaleDateString()}.pdf`}
            >
              <span className={`flex gap-1.5`}>
                <span className={`mt-0.5`}>PDF</span>
                <FaFileDownload />
              </span>
            </PDFDownloadLink>
          </button>
        </div>
        <div className="overflow-x-auto !mt-5">
          <table className="table border">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Date</th>
                <th>License Duration</th>
                <th>Previous Status</th>
                <th>Updated Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => {
                return (
                  <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                    <th> {++idx}</th>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>
                      {new Date().toLocaleDateString()} -{" "}
                      {new Date().toLocaleDateString()}
                    </td>
                    <td>Active</td>
                    <td>Suspend</td>
                    <td>Consider 7 days</td>
                    <td className={`space-x-1.5`}>
                      <span
                        className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                        onClick={() =>
                          navigate(`/dashboard/adminowner-view/${idx}`)
                        }
                      >
                        <FaEye />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
  );
};

export default StatusHistory;