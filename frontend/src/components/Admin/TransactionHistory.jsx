import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useFormik } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CreateReport from "../pdf/CreateReport.jsx";
import { FaFileDownload } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useGetTransactionlogsQuery } from "../../redux/admin/ownerlist/ownerListAPI.js";
import { useParams } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import { Rings } from "react-loader-spinner";

const TransactionHistory = () => {
  const [historyPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();
  const [forcePage, setForcePage] = useState(null);
  const [PDF, setPDF] = useState([]);
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
        fromDate: formik.values.startDate,
        toDate: formik.values.endDate,
      }));
    },
    onReset: () => {
      setCurrentPage(0);
      setForcePage(0);
    },
  });

  const { data, error, isLoading, isSuccess } = useGetTransactionlogsQuery({
    ...searchParams,
    cp: currentPage,
  });
  // 65451c80dd95504ee1047f0b
  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
    setForcePage(page);
  };

  useEffect(() => {
    if (data) {
      const values = data?.docs?.map((item) => ({
        Date: new Date(item?.createdAt).toLocaleDateString(),
        "Transaction Id": item.tran_id,
        "Payment Method": item?.payment_method,
        "License Duration": item?.payment_for,
        Amount: item?.amount,
        "Payment For": item?.payment_for,
        "Deposit By": item?.to,
      }));

      setPDF(values);
    }
  }, [data]);

  return (
    <div className="card w-full bg-white shadow-xl">
      <div className="card-body space-y-10">
        <h1 className="text-2xl text-center ">Transaction History</h1>
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
                return formik.setFieldValue("startDate", date);
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
                return formik.setFieldValue("endDate", date);
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
              onClick={() => {
                setCurrentPage(0);
                setForcePage(0);
                formik.handleSubmit();
              }}
              className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
            >
              Search
            </button>
          </div>
          {PDF.length ? (
            <PDFDownloadLink
              document={
                <CreateReport
                  values={PDF}
                  header={{
                    title: "DAK Hospitality LTD",
                    name: "Transaction History",
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
                    <th>Deposit By</th>

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
                        <td>{item?.payment_for}</td>
                        <td>{item?.amount}</td>
                        <td>{item?.payment_for}</td>
                        <td>{item?.to}</td>
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

export default TransactionHistory;
