import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaFileInvoice, FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateReport from "../../components/pdf/CreateReport.jsx";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import {
  useGetAllReportQuery,
  useGetReportQuery,
} from "../../redux/admin/report/reportAPI.js";
import { Rings } from "react-loader-spinner";
import { GrPowerReset } from "react-icons/gr";

const Report = () => {
  const [forcePage, setForcePage] = useState(null);
  const { user } = useSelector((store) => store.authSlice);
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchParams, setSearchParams] = useState({
    fromDate: "",
    toDate: "",
    search: "",
  });
  const [PDF, setPDF] = useState([]);

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
        toDate: values.endDate,
        fromDate: values.startDate,
        search: values.search,
      }));
    },
    onReset: (values) => {
      setCurrentPage(0);
      setForcePage(0);
    },
  });

  const { isLoading, data: reports } =
    !id && user.role === "admin"
      ? useGetAllReportQuery({
          ...searchParams,
          cp: currentPage,
          filter: formik.values.filter,
          limit: formik.values.entries,
        })
      : useGetReportQuery({
          ...searchParams,
          cp: currentPage,
          uid: id || user._id,
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
    if (reports) setPageCount(reports?.totalPages);
  }, [reports]);
 
  useEffect(() => {
    if (reports) {
      const total = reports.docs.reduce(
        (total, current) => total + current.paid_amount,
        0,
      );

      setTotalAmount(total);
    }
  }, [reports]);

  useEffect(() => {
    if (reports) {
      const data = reports?.docs?.map((item) => ({
        Username: item.username,
        Phone: item.phone_no,
        "Purchase Date": new Date(item.bill_from).toLocaleDateString(),
        "Expire Date": new Date(item.bill_to).toLocaleDateString(),
        "Deposit By": item.deposit_by,
        "Paid Amount": item.paid_amount,
      }));

      setPDF(data);
    }
  }, [reports]);

  function extractTimeOrDate(inputString, identifier) {
    try {
      const extractedDateTime = new Date(inputString);

      if (identifier === "time") {
        return extractedDateTime.toTimeString().split(" ")[0];
      } else if (identifier === "date") {
        return extractedDateTime.toISOString().split("T")[0];
      } else {
        throw new Error("Invalid identifier. Use 'time' or 'date'.");
      }
    } catch (error) {
      return null;
    }
  }

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      formik.handleSubmit();
    }
  };

  return (
    <div className={`space-y-5`}>
      <div className={`bg-white p-4 rounded`}>
      <div>
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
        <div className={`flex flex-wrap gap-1.5 justify-between`}>
          <h3 className={`text-xl font-semibold mb-3 mt-3 `}>All Report</h3>
          <div className="flex gap-1.5">
            <div className={`flex gap-1.5`}>
              <button
                type={"button"}
                className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
                onClick={() =>
                  exportExcel(PDF, new Date().toLocaleDateString())
                }
              >
                CSV
              </button>
              {PDF.length ? (
                  <PDFDownloadLink
                    document={<CreateReport values={PDF} header={{
                      title: "DAK Hospitality LTD",
                      name: "All Report",
                    }} />}
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
          <div    className={`flex flex-col md:flex-row gap-3`}>
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
            <div>
              <select
                name="filter"
                className="select select-sm bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none"
                value={formik.values.filter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="All" selected>
                  All
                </option>
                <option value="Sold">Sold</option>
                <option value="Renew">Renew</option>
                {/* <option value="Expired">Expired</option> */}
              </select>
            </div>
          </div>
          <div className={`flex flex-col md:flex-row gap-3`}>
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
              onClick={() => {
                setCurrentPage(0);
                setForcePage(0);
                formik.handleSubmit()
              }}
              className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
            >
              Apply Filter
            </button>
          </div>
          <div className={`relative max-w-xs`}>
            <input
              type="text"
              placeholder="Search by name..."
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
        <div className={`space-y-10 mt-10`}>
          {!isLoading ? (
            reports?.docs?.length ? (
              <>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Username</th>
                        <th>Phone Number</th>
                        <th>Purchase Date</th>
                        <th>Expired Date</th>
                        <th>Deposit By</th>
                        <th>Hotel Limits</th>
                        <th>Paid Amount</th>
                        <th>Payment Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...reports?.docs]
                        ?.sort((a, b) =>
                          a.username.toLowerCase() > b.username.toLowerCase()
                            ? 1
                            : a.username.toLowerCase() <
                              b.username.toLowerCase()
                            ? -1
                            : 0,
                        )
                        ?.map((report, idx) => {
                          return (
                            <tr
                              className={
                                idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                              }
                            >
                              <th>{++idx}</th>
                              <td>{report?.username}</td>
                              <td>{report?.phone_no}</td>
                              <td>
                                {extractTimeOrDate(report?.bill_from, "date")}
                                <br />{" "}
                                {extractTimeOrDate(report.bill_from, "time")}
                              </td>
                              <td>
                                {extractTimeOrDate(report?.bill_to, "date")}
                                <br />{" "}
                                {extractTimeOrDate(report.bill_to, "time")}
                              </td>
                              <td>{report?.deposit_by}</td>
                              <td>{report?.hotel_limit}</td>
                              <td>{report?.paid_amount}</td>
                              <td>{report?.status}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot className={`text-sm`}>
                      <tr>
                        <td colSpan={6}></td>
                        <td>Total</td>
                        <td>{totalAmount}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
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
                    pageCount={reports?.totalPages}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    renderOnZeroPageCount={null}
                    forcePage={forcePage}
                  />
                </div>
              </>
            ) : (
              <h3>No data!</h3>
            )
          ) : (
            <Rings
              width="50"
              height="50"
              color="#37a000"
              wrapperClass="justify-center"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
