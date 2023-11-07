import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useFormik } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaFileDownload } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useGetTransactionlogsQuery } from "../../redux/admin/ownerlist/ownerListAPI.js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rings } from "react-loader-spinner";

const LicenseHistory = () => {
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
  });

  const [historyPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useSelector((store) => store.authSlice);

  const [searchParams, setSearchParams] = useState({
    id: user._id,
    fromDate: "",
    toDate: "",
    cp: currentPage,
  });
  const { data, error, isLoading, isSuccess } =
    useGetTransactionlogsQuery(searchParams);
  // 65451c80dd95504ee1047f0b
  console.log(isSuccess && { data });
  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (data) setPageCount(data.totalPages);
  }, [data]);
  console.log(data);
  return (
    <div className="card w-full bg-white shadow-xl">
      <div className="card-body space-y-10">
        <h1 className="text-2xl text-center ">License History</h1>
        <div className="flex justify-between">
          <div className={`flex gap-3`}>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="startDate"
              placeholderText={`From`}
              selected={formik.values.startDate}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              onChange={(date) => {
                return formik.setFieldValue("startDate", date);
              }}
              onBlur={formik.handleBlur}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="endDate"
              placeholderText={`To`}
              selected={formik.values.endDate}
              className={`input input-sm input-bordered rounded focus:outline-none`}
              onChange={(date) => {
                return formik.setFieldValue("endDate", date);
              }}
              onBlur={formik.handleBlur}
            />
            <button
              type={"button"}
              onClick={() =>
                setSearchParams((p) => ({
                  ...p,
                  fromDate: formik.values.startDate,
                  toDate: formik.values.endDate,
                }))
              }
              className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
            >
              Search
            </button>
          </div>
        </div>
        {!isLoading ? (
          data?.docs?.length ? (
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
                  {data?.docs.map((item, idx) => {
                    return (
                      <tr
                        className={
                          idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                        }
                      >
                        <th>{++idx}</th>
                        <td>
                          {new Date(item?.createdAt).toLocaleDateString()}
                        </td>
                        <td>{item.tran_id}</td>
                        <td>{item?.payment_method}</td>
                        <td>
                          {Math.floor(
                            Math.abs(
                              new Date(item?.bill_from) -
                                new Date(item?.bill_to),
                            ),
                          ) /
                            (24 * 60 * 60 * 1000)}
                        </td>
                        <td>{item?.amount}</td>
                        <td>{item?.payment_for}</td>

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
                  pageCount={data?.totalPages}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageClick}
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
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
  );
};

export default LicenseHistory;
