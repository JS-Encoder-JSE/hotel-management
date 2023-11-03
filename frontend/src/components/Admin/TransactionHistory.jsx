import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useFormik } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CreateReport from "../pdf/CreateReport.jsx";
import { FaFileDownload } from "react-icons/fa";

const TransactionHistory = () => {
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
        <h1 className="text-2xl text-center ">Transaction History</h1>
        <div className="flex justify-between">
          <div className={`space-x-3`}>
            <span>From</span>
            <input
              type="date"
              name={`startDate`}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              value={formik.values.startDate}
              onChange={formik.handleChange}
            />
            <span>To</span>
            <input
              type="date"
              name={`endDate`}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              value={formik.values.endDate}
              onChange={formik.handleChange}
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
                <th>Transaction Id</th>
                <th>Payment Method</th>
                <th>License Duration</th>
                <th>Amount</th>
                <th>Payment For</th>
                {/*<th>Action</th>*/}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => {
                return (
                  <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                    <th>{++idx}</th>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>DSER-HGYT-GHTY-54564</td>
                    <td>Cash</td>
                    <td>
                      {new Date().toLocaleDateString()} -{" "}
                      {new Date().toLocaleDateString()}
                    </td>
                    <td>25000</td>
                    <td>Renew</td>
                    {/*<td className={`space-x-1.5`}>*/}
                    {/*  <span*/}
                    {/*    className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}*/}
                    {/*    onClick={() =>*/}
                    {/*      navigate(`/dashboard/adminowner-view/${idx}`)*/}
                    {/*    }*/}
                    {/*  >*/}
                    {/*    <FaEye />*/}
                    {/*  </span>*/}
                    {/*</td>*/}
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

export default TransactionHistory;
