import React, { useState, useEffect } from "react";

import {
  FaArrowLeft,
  FaEye,
  FaRegEdit,
  FaRegFilePdf,
  FaRupeeSign,
} from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import { MdCurrencyRupee } from "react-icons/md";
import EditTodaysales from "./EditTodaysales";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import {
  useGetDailyDataQuery,
  useGetHotelByManagerIdQuery,
  useGetOrdersByDateQuery,
} from "../../redux/room/roomAPI";
import {
  fromDateIsoConverterForAddExpenses,
  getConvertedIsoEndDate,
  getConvertedIsoStartDate,
} from "../../utils/utils";
import { useGetReportsByDateQuery } from "../../redux/expensesAndSales/expensesAndSalesApi";
import RestaurantSalesHistory from "../../pages/report/RestaurantSalesHistory";
import HotelSalesTodayReport from "../../pages/report/HotelSalesTodayReport";
import HotelSalesHistoryReport from "../../pages/report/HotelSalesHistoryReport";
import ReportPrint from "../../pages/report/ReportPrint";

const HotelSalesShow = ({ managerId, hotelId }) => {
  // console.log('------hotelId',managerId);
  const [PDF, setPdf] = useState([]);
  const navigate = useNavigate();
  const [managersPerPage] = useState(10);
  // for todayda
  const [pageCount, setPageCount] = useState(0);
  const [forcePage, setForcePage] = useState(null);

  // /today data
  const [currentPage, setCurrentPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);

  const [HistoryCurrentPage, setHistoryCurrentPage] = useState(0);

  const {
    data: hotelInfo,
    isLoading: isHotelLoading,
    isSuccess: isHotelSuccess,
  } = useGetHotelByManagerIdQuery(managerId);

  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useState({
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
        toDate: p ? getConvertedIsoEndDate(values.endDate) : "",
        fromDate: p ? getConvertedIsoStartDate(values.startDate) : "",
      }));
    },
    onReset: (values) => {
      setCurrentPage(0);
      setForcePage(0);
      setHistoryCurrentPage(0);
      setSearchParams("");
    },
  });

  // for filter
  const handlePageClick = ({ selected: page }) => {
    setHistoryCurrentPage(page);
  };
  // for today data
  const handlePageTrigger = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.search === 13) {
      formik.handleSubmit();
    }
  };

  const { data: hotelTodaySales } = useGetReportsByDateQuery({
    cp: currentPage,
    date: getConvertedIsoStartDate(new Date().toLocaleDateString()),
    hotelId: hotelId,
  });

  const totalPaidAmount = hotelTodaySales?.data?.docs.reduce(
    (total, item) => total + (item.paid_amount || 0),
    0
  );
  console.log(totalPaidAmount);

  useEffect(() => {
    if (hotelTodaySales) setPageCount(hotelTodaySales?.data?.totalPages);
  }, [hotelTodaySales]);

  //   // / query by searchParams
  //   const {
  //     data: hotelSalesToday,
  //     error: restaurantSaleEx,
  //     isLoading: dataLoading,
  //   } = useGetOrdersByDateQuery({
  //     date: new Date(new Date()).toLocaleDateString(),
  //     order_status: "CheckedOut",
  //     hotel_id: managerId,
  //   });

  // cons

  // History
  const {
    data: hotelSalesHistory,
    error,
    isLoading,
  } = useGetDailyDataQuery({
    ...searchParams,
    cp: HistoryCurrentPage,
    fromDate: searchParams?.fromDate,
    toDate: searchParams?.toDate,
    managerId: managerId,
    limit: formik.values.entries,
    filter: "hotel",
  });

  useEffect(() => {
    setPdf(hotelTodaySales?.data.docs);
  }, [hotelTodaySales]);

  // history
  // useEffect(() => {
  //   if (hotelSalesHistory) setCurrentPage(hotelSalesHistory?.data?.totalPages);
  // }, [hotelSalesHistory]);

  return (
    <div className={`space-y-5`}>
      <div className={`bg-white p-4 rounded`}>
        <div>
          <div>
            <div>
              <h3
                className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}
              >
                Today's Sales
              </h3>
            </div>
            <div>
              <div className={`flex justify-end mb-5 mr-5`}>
                {PDF?.length ? (
                  <PDFDownloadLink
                    document={
                      <HotelSalesTodayReport
                        date={hotelTodaySales?.data?.docs}
                        values={hotelTodaySales?.data?.docs}
                        header={{
                          title: "DAK Hospitality LTD",
                          name: "Today's Sales ",
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

              <div className=" overflow-x-auto overflow-y-auto">
                {hotelTodaySales && hotelTodaySales?.data?.docs?.length ? (
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
                      {hotelTodaySales &&
                        hotelTodaySales?.data?.docs?.map((item, idx) => {
                          console.log();
                          return (
                            <tr
                              className={
                                idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                              }
                            >
                              <th>{++idx}</th>
                              <td>{item?.guestName}</td>
                              <td>
                                {new Date(
                                  item?.checked_in
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {new Date(
                                  item?.checked_out
                                ).toLocaleDateString()}{" "}
                              </td>
                              <td>{item?.paid_amount}</td>
                              <td>{item?.payable_amount}</td>
                              <td>{item?.payment_method}</td>
                              <td>
                                {item?.room_numbers?.map((roomNum) => roomNum)}
                              </td>
                              <td>{item?.unpaid_amount}</td>
                              <td>
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
                  <p className="text-center my-48"> No Sales Today</p>
                )}
              </div>
            </div>
            {hotelTodaySales?.data?.docs?.length && (
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
                  pageCount={hotelTodaySales?.data?.totalPages}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageTrigger}
                  renderOnZeroPageCount={null}
                />
              </div>
            )}
          </div>
        </div>

        {/* Restaurant Expenses */}

        <div className={`mb-10 mt-10`}>
          <div>
            <h3
              className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}
            >
              Hotel Sales
            </h3>
          </div>
          <div className={`flex justify-end mb-5 mr-5`}>
            {PDF?.length ? (
              <PDFDownloadLink
                document={
                  <HotelSalesHistoryReport
                    date={hotelTodaySales?.data?.docs?.date}
                    values={hotelSalesHistory?.data?.docs}
                    header={{
                      title: "DAK Hospitality LTD",
                      name: " Hotel Sales ",
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
              formik.handleSubmit();
            }}
            disabled={
              formik.values.startDate === "" || formik.values.endDate === ""
                ? true
                : false
            }
            className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
          >
            Apply Filter
          </button>
        </div>
        <hr className={`my-5 mb-4`} />
        <div className={`space-y-10`}>
          <div className="overflow-x-auto">
            {hotelSalesHistory && hotelSalesHistory?.data?.docs?.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelSalesHistory &&
                    hotelSalesHistory?.data?.docs?.map((item, idx) => {
                      return (
                        <tr
                          className={
                            idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                          }
                        >
                          <th>{++idx}</th>
                          <td>{new Date(item?.date).toLocaleDateString()}</td>
                          <td>
                            <div className="flex">
                              <div>
                                <FaRupeeSign />
                              </div>
                              <div>
                                <span>{item?.today_hotel_income}</span>
                              </div>
                            </div>
                          </td>
                          <td className={`space-x-1.5`}>
                            <span
                              className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                              onClick={() =>
                                navigate(
                                  `/dashboard/hotel-sales-details?date=${item?.date}&&hotel=${hotelId}&managerId=${managerId}`
                                )
                              }
                            >
                              <FaEye />
                            </span>
                            {/* <span
                          className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case`}
                        >
                          <AiTwotoneDelete />
                        </span> */}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <p className="text-center my-16">No sales yet!</p>
            )}
          </div>
          {hotelSalesHistory?.data?.docs?.length && (
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
                pageCount={hotelSalesHistory?.data?.totalPages}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelSalesShow;
// /dashboard/hotel-sales-details?date=${item?.date}&&hotel=${hotelId}
