import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaRegEdit,
  FaRegFilePdf,
  FaRupeeSign,
} from "react-icons/fa";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useFormik } from "formik";
// import EditExpensesView from "./EditExpensesView";
import ReactPaginate from "react-paginate";
import EditHotelSales from "./EditHotelSales";
import {
  useGetHotelByManagerIdQuery,
  useGetOrdersByDateQuery,
} from "../../redux/room/roomAPI";
import {
  fromDateIsoConverterForAddExpenses,
  getformatDateTime,
} from "../../utils/utils";
import { useGetReportsByDateQuery } from "../../redux/expensesAndSales/expensesAndSalesApi";
import { current } from "@reduxjs/toolkit";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import HotelSalesTodayReport from "../report/HotelSalesTodayReport";
import ReportPrint from "../report/ReportPrint";
import { useSelector } from "react-redux";

const HotelSalesView = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchParams] = useSearchParams();
  const [PDF, setPdf] = useState([]);

  const dateParam = searchParams.get("date");
  const hotelId = searchParams.get("hotel");
  const managerId = searchParams.get("managerId");

  console.log(managerId);

  const { user } = useSelector((state) => state.authSlice);

  const {
    data: hotelInfo,
    isLoading: isHotelLoading,
    isSuccess: isHotelSuccess,
  } = useGetHotelByManagerIdQuery(managerId);

  // query by searchParams
  const {
    data: orderedDataByDate,
    error: orderError,
    isLoading: orderItemSuccess,
  } = useGetReportsByDateQuery({
    cp: currentPage,
    date: new Date(dateParam).toLocaleDateString(),
    hotelId: hotelId,
  });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    setPdf(orderedDataByDate?.data.docs);
  }, [orderedDataByDate]);

  console.log(hotelInfo);

  return (
    <div className={`bg-white p-10 rounded-2xl space-y-8`}>
      <div className={`flex justify-between `}>
        <div
          className="text-white bg-green-slimy  font-medium rounded-lg p-2 text-sm text-center inline-flex me-2 gap-1 "
          onClick={() => navigate(-1)}
        >
          <span>
            {" "}
            <FaArrowLeft className="inline" />
            <span>Back</span>
          </span>
        </div>
        <div className={`flex justify-end`}>
          {PDF?.length ? (
            <PDFDownloadLink
              document={
                <HotelSalesTodayReport
                  date={orderedDataByDate?.data?.docs}
                  values={orderedDataByDate?.data?.docs}
                  header={{
                    title: "DAK Hospitality LTD",
                    name: "Hotel Sales Information ",
                  }}
                />
              }
              fileName={`${new Date().toLocaleDateString()}.pdf`}
              className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
              onError={(error) => console.error("PDF Error", error)}
            >
              <BsFileEarmarkPdfFill />
              PDF
            </PDFDownloadLink>
          ) : null}
        </div>
      </div>
      <div>
        <h1 className="text-center text-2xl bg-green-slimy w-[17rem] mx-auto text-white p-1 rounded-md">
          {" "}
          Hotel Sales Information
        </h1>
      </div>
      <div></div>
      <div className=" overflow-x-auto ">
        {orderedDataByDate && orderedDataByDate?.data?.docs?.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Guest Name</th>
                <th>CheckIn Date</th>
                <th>Checkout Date</th>
                <th>Paid Amount</th>
                <th>Payable Amount</th>
                <th>Payment Method</th>
                <th>Room Numbers</th>
                <th>Unpaid Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderedDataByDate &&
                orderedDataByDate?.data?.docs?.map((item, idx) => {
                  console.log(item?.room_numbers[0]);
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{item?.guestName}</td>
                      <td>{getformatDateTime(item?.checked_in)}</td>
                      <td>{getformatDateTime(item?.checked_out)} </td>
                      <td>{item?.paid_amount}</td>
                      <td>{item?.payable_amount}</td>
                      <td>{item?.payment_method}</td>
                      <td>{item?.room_numbers?.map((roomNum) => roomNum)}</td>
                      <td>{item?.unpaid_amount}</td>
                      <td>
                        {" "}
                        <ReportPrint
                          hotelInfo={hotelInfo[0]}
                          booking_id={item?.booking_ids[0]}
                          roomNumber={item?.room_numbers[0]}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-14"> No Sales Today</p>
        )}
      </div>
      {/* pagination */}
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
          pageCount={orderedDataByDate?.data?.totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default HotelSalesView;
