import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaFileInvoice, FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CreateCustomerReceipt from "../../components/pdf/CreateCustomerReceipt.jsx";
import * as XLSX from "xlsx";
import CreateReport from "../../components/pdf/CreateReport.jsx";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { GrPowerReset } from "react-icons/gr";
import DatePicker from "react-datepicker";
import {
  useGetAllReportQuery,
  useGetReportQuery,
} from "../../redux/admin/report/reportAPI.js";
import { useGetManagerReportQuery } from "../../redux/report/reportAPI.js";
import { Rings } from "react-loader-spinner";
import { getFormateDateAndTime, getISOStringDate } from "../../utils/utils.js";
import ManagerReport from "./ManagerReport.jsx";
import { getformatDateTime } from "../../utils/timeZone.js";

const ReportManager = () => {
  const [forcePage, setForcePage] = useState(null);
  const navigate = useNavigate();
  const [reportsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [PDF, setPDF] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchParams, setSearchParams] = useState({
    fromDate: "",
    toDate: "",
    search: "",
  });
  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      entries: "",
      search: "",
      filter: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: (values) => {
      setSearchParams((p) => ({
        ...p,
        toDate: getISOStringDate(values.endDate),
        fromDate: getISOStringDate(values.startDate),
        search: values.search,
      }));
    },
    onReset: (values) => {
      setCurrentPage(0);
      setForcePage(0);
    },
  });
  const { isLoading, data: reports } = useGetManagerReportQuery({
    ...searchParams,
    cp: currentPage,
    filter: formik.values.filter,
    limit: formik.values.entries,
  });

  const exportExcel = async (data, name) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, `${name}.xlsx`);
  };

  useEffect(() => {
    if (reports) setPageCount(reports?.data?.totalPages);
  }, [reports]);

  useEffect(() => {
    if (reports) {
      const total = reports?.data?.docs?.reduce(
        (total, current) => total + current.paid_amount,
        0
      );
      setTotalAmount(total);
      setPDF(reports?.data?.docs);
    }
  }, [reports]);

  return (
    <div className={` space-y-5`}>
      <div className={`bg-white p-5 py-5 rounded `}>
        <div className="mb-7">
          <Link to={`/dashboard `}>
            <button
              type="button"
              className="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
            >
              <dfn>
                <abbr title="Back">
                  <FaArrowLeft />
                </abbr>
              </dfn>

              <span className="tracking-wider font-semibold text-[1rem]"></span>
            </button>
          </Link>
        </div>
        <div>
          <h3
            className={`bg-green-slimy text-2xl text-white max-w-[12rem]  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}
          >
            All Report
          </h3>
        </div>
        <div
          className={`flex flex-wrap gap-1.5 justify-end flex-col md:flex-row `}
        >
          <div className="flex gap-1.5">
            <div className={`flex gap-1.5`}>
              <button
                type={"button"}
                className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
                onClick={() => exportExcel(reports?.data?.docs, "testexcel")}
              >
                CSV
              </button>
              {PDF.length ? (
                <PDFDownloadLink
                  document={
                    <ManagerReport
                      values={PDF}
                      header={{
                        title: "DAK Hospitality LTD",
                        name: "All Report",
                      }}
                    />
                  }
                  fileName={`${new Date().toLocaleDateString()}.pdf`}
                  className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                >
                  PDF
                </PDFDownloadLink>
              ) : null}
            </div>
          </div>
        </div>
        <hr className={`my-5`} />
        <div className={`flex flex-col gap-5`}>
          <div className={`flex justify-between`}>
            <div className={`space-x-1.5`}>
              <span>Show</span>
              <select
                name="entries"
                className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
                value={formik.values.entries}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
          </div>
          <div className={`flex flex-col md:flex-row gap-4`}>
            <DatePicker
              autoComplete={`off`}
              dateFormat="dd/MM/yyyy"
              name="startDate"
              placeholderText={`From`}
              selected={formik.values.startDate}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              onChange={(date) => formik.setFieldValue("startDate", date)}
              onBlur={formik.handleBlur}
              onKeyUp={(e) => {
                e.target.value === "" ? formik.handleSubmit() : null;
              }}
              onKeyDown={(e) => pressEnter(e)}
            />
            <DatePicker
              autoComplete={`off`}
              dateFormat="dd/MM/yyyy"
              name="endDate"
              placeholderText={`To`}
              selected={formik.values.endDate}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              onChange={(date) => formik.setFieldValue("endDate", date)}
              onBlur={formik.handleBlur}
              onKeyUp={(e) => {
                e.target.value === "" ? formik.handleSubmit() : null;
              }}
              onKeyDown={(e) => pressEnter(e)}
            />
            <button
              type={"button"}
              onClick={() => {
                formik.resetForm();
                formik.handleSubmit();
              }}
              className="btn btn-sm min-w-[2rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
            >
              <GrPowerReset className="text-green-slimy" />
            </button>
            <button
              type={"button"}
              onClick={formik.handleSubmit}
              className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
            >
              Apply Filter
            </button>
          </div>
          <div className={`relative max-w-xs`}>
            <input
              type="text"
              placeholder="Search by Guest Name..."
              name="search"
              className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
              value={formik.values.search}
              onChange={formik.handleChange}
              onKeyUp={(e) => {
                e.target.value === "" ? formik.handleSubmit() : null;
              }}
              onKeyDown={(e) => pressEnter(e)}
            />
            <button
              onClick={formik.handleSubmit}
              type="button"
              className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        {!isLoading ? (
          <div className="overflow-x-auto mt-10">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  {/* <th>Booking Number</th> */}
                  <th>Guest Name</th>
                  <th>Room Numbers</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Paid Amount</th>
                  {/*<th>Deposit By</th>*/}
                </tr>
              </thead>
              <tbody>
                {reports?.data?.docs?.map((report, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{report.guestName}</td>
                      <td>{report?.room_numbers.join(",")}</td>
                      <td>{getformatDateTime(report?.checked_in)}</td>

                      <td>{getformatDateTime(report?.checked_out)}</td>
                      <td>{report?.paid_amount}</td>
                      <td className={`space-x-1.5`}></td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className={`text-sm`}>
                <tr>
                  <td colSpan={5} className={`text-end`}>
                    Total
                  </td>
                  <td>{totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <Rings
            width="50"
            height="50"
            color="#37a000"
            wrapperClass="justify-center"
          />
        )}
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
            forcePage={forcePage}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportManager;
