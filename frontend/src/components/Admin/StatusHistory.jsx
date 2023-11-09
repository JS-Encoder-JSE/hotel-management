import React, { useEffect, useState } from "react";
import { FaEye, FaFileDownload } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CreateReport from "../pdf/CreateReport.jsx";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useGetStatuslogsQuery } from "../../redux/admin/ownerlist/ownerListAPI.js";
import { data } from "autoprefixer";
import { GrPowerReset } from "react-icons/gr";
import { Rings } from "react-loader-spinner";

const StatusHistory = () => {
  const navigate = useNavigate();

  const [historyPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();
  const [forcePage, setForcePage] = useState(null);
  const [searchParams, setSearchParams] = useState({
    id,
    fromDate: "",
    toDate: "",
  });

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    onSubmit: (values) => {
      setSearchParams((p) => ({
        ...p,
        fromDate: values.startDate || "",
        toDate: values.endDate || "",
      }));
    },
    onReset: (values) => {
      setCurrentPage(0);
      setForcePage(0);
    },
  });

  const {
    data: statusHistory,
    error,
    isLoading,
  } = useGetStatuslogsQuery({ ...searchParams, cp: currentPage });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
    setForcePage(page);
  };

  useEffect(() => {
    if (statusHistory) setPageCount(statusHistory.totalPages);
  }, [statusHistory]);

  return (
    <div className="card w-full bg-white shadow-xl">
      <div className="card-body space-y-10">
        <h1 className="text-2xl text-center ">Status History</h1>
        <div className="flex justify-between">
          <div className={`flex gap-3`}>
            <DatePicker
              autoComplete={`off`}
              dateFormat="dd/MM/yyyy"
              name="startDate"
              placeholderText={`From`}
              selected={formik.values.startDate}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              onChange={(date) => {
                formik.setFieldValue("startDate", date);
                setToDate(date);
              }}
              onBlur={formik.handleBlur}
            />
            <DatePicker
              autoComplete={`off`}
              dateFormat="dd/MM/yyyy"
              name="endDate"
              placeholderText={`To`}
              selected={formik.values.endDate}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              onChange={(date) => {
                formik.setFieldValue("endDate", date);
                setFromData(date);
              }}
              onBlur={formik.handleBlur}
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
              Search
            </button>
          </div>
          <button
            type={"button"}
            className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            {/*<PDFDownloadLink*/}
            {/*  document={<CreateReport />}*/}
            {/*  fileName={`${new Date().toLocaleDateString()}.pdf`}*/}
            {/*>*/}
            {/*  <span className={`flex gap-1.5`}>*/}
            {/*    <span className={`mt-0.5`}>PDF</span>*/}
            {/*    <FaFileDownload />*/}
            {/*  </span>*/}
            {/*</PDFDownloadLink>*/}
          </button>
        </div>
        {!isLoading ? (
          statusHistory?.docs?.length ? (
            <div className="overflow-x-auto !mt-5">
              <table className="table border">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Date</th>
                    {/* <th>License Duration</th> */}
                    <th>Previous Status</th>
                    <th>Updated Status</th>
                    <th>Remarks</th>
                    <th>Issue By</th>
                    <th>Extended Time</th>
                  </tr>
                </thead>
                <tbody>
                  {statusHistory?.docs?.map((item, idx) => {
                    return (
                      <tr
                        className={
                          idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                        }
                      >
                        <th> {++idx}</th>
                        <td>
                          {new Date(item?.createdAt).toLocaleDateString()}
                        </td>
                        {/* <td>
                      {new Date().toLocaleDateString()} -{" "}
                      {new Date().toLocaleDateString()}
                    </td> */}
                        <td>{item?.pre_status}</td>
                        <td>{item?.updated_status}</td>
                        <td>{item?.remark}</td>
                        <td>{item?.changed_from}</td>
                        <td>
                          {item?.extended_time?.from
                            ? new Date(
                                item?.extended_time.from,
                              ).toLocaleDateString()
                            : ""}{" "}
                          -
                          {item?.extended_time?.to
                            ? new Date(
                                item?.extended_time?.to,
                              ).toLocaleDateString()
                            : ""}
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
                  forcePage={forcePage}
                />
              </div>
            </div>
          ) : (
            <h3 className={`text-center mt-10`}>No data found!</h3>
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
  );
};

export default StatusHistory;
